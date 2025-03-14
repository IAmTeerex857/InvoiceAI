import { FC, useState } from 'react';
import { FileText, Upload, Trash2, Plus, ChevronDown } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface InvoiceData {
  from: string;
  to: string;
  logo?: string;
  items: Array<{
    description: string;
    quantity: number;
    rate: number;
  }>;
  notes?: string;
  terms?: string;
  currency: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  poNumber?: string;
}

// Currency data with symbols and abbreviations
interface Currency {
  code: string;
  symbol: string;
  name: string;
}

const currencies: Currency[] = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
  { code: 'BRL', symbol: 'R$', name: 'Brazilian Real' },
  { code: 'ZAR', symbol: 'R', name: 'South African Rand' }
];

export const InvoiceGenerator: FC = () => {
  const [loading, setLoading] = useState(false);
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    from: '',
    to: '',
    items: [{ description: '', quantity: 0, rate: 0 }],
    notes: '',
    terms: '',
    currency: 'USD',
    invoiceNumber: '1',
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    poNumber: ''
  });
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [logo, setLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>('');

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      setLogo(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  });

  const removeLogo = () => {
    setLogo(null);
    setLogoPreview('');
  };

  const addItem = () => {
    setInvoiceData({
      ...invoiceData,
      items: [...invoiceData.items, { description: '', quantity: 0, rate: 0 }]
    });
  };

  const removeItem = (index: number) => {
    const newItems = [...invoiceData.items];
    newItems.splice(index, 1);
    setInvoiceData({ ...invoiceData, items: newItems });
  };

  const calculateTotal = () => {
    return invoiceData.items.reduce((total, item) => total + (item.quantity * item.rate), 0);
  };

  const getCurrencySymbol = (currencyCode: string): string => {
    const currency = currencies.find(c => c.code === currencyCode);
    return currency ? currency.symbol : '$';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let logoUrl = '';
      if (logo) {
        const reader = new FileReader();
        const base64Logo = await new Promise<string>((resolve) => {
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(logo);
        });
        logoUrl = base64Logo;
      }

      try {
        // Generate PDF using jsPDF
        const doc = new jsPDF();
        const currencySymbol = getCurrencySymbol(invoiceData.currency);
        
        // Set document properties
        doc.setFontSize(24);
        doc.setTextColor(40, 40, 40);
        doc.text('INVOICE', 190, 20, { align: 'right' });
        
        // Add logo if available
        if (logoUrl) {
          doc.addImage(logoUrl, 'JPEG', 15, 15, 50, 30);
        }
        
        // Invoice details
        doc.setFontSize(10);
        doc.setTextColor(80, 80, 80);
        doc.text('#', 150, 40);
        doc.setFontSize(12);
        doc.setTextColor(40, 40, 40);
        doc.text(invoiceData.invoiceNumber, 190, 40, { align: 'right' });
        
        doc.setFontSize(10);
        doc.setTextColor(80, 80, 80);
        doc.text('Date', 150, 50);
        doc.setFontSize(12);
        doc.setTextColor(40, 40, 40);
        doc.text(invoiceData.date, 190, 50, { align: 'right' });
        
        // Payment terms moved to bottom
        
        doc.setFontSize(10);
        doc.setTextColor(80, 80, 80);
        doc.text('Due Date', 150, 70);
        doc.setFontSize(12);
        doc.setTextColor(40, 40, 40);
        doc.text(invoiceData.dueDate, 190, 70, { align: 'right' });
        
        if (invoiceData.poNumber) {
          doc.setFontSize(10);
          doc.setTextColor(80, 80, 80);
          doc.text('PO Number', 150, 80);
          doc.setFontSize(12);
          doc.setTextColor(40, 40, 40);
          doc.text(invoiceData.poNumber || '', 190, 80, { align: 'right' });
        }
        
        // From and To sections
        doc.setFontSize(10);
        doc.setTextColor(80, 80, 80);
        doc.text('Who is this from?', 15, 70);
        doc.setFontSize(12);
        doc.setTextColor(40, 40, 40);
        const fromLines = invoiceData.from.split('\n');
        fromLines.forEach((line, index) => {
          doc.text(line, 15, 80 + (index * 6));
        });
        
        doc.setFontSize(10);
        doc.setTextColor(80, 80, 80);
        doc.text('Bill To', 15, 110);
        doc.setFontSize(12);
        doc.setTextColor(40, 40, 40);
        const toLines = invoiceData.to.split('\n');
        toLines.forEach((line, index) => {
          doc.text(line, 15, 120 + (index * 6));
        });
        
        // Items table
        const tableColumn = ['Item', 'Quantity', 'Rate', 'Amount'];
        const tableRows = invoiceData.items.map(item => [
          item.description || 'Item',
          item.quantity.toString(),
          `${currencySymbol}${item.rate.toFixed(2)}`,
          `${currencySymbol}${(item.quantity * item.rate).toFixed(2)}`
        ]);
        
        // Use autoTable as a function
        autoTable(doc, {
          head: [tableColumn],
          body: tableRows,
          startY: 150,
          theme: 'grid',
          styles: { fontSize: 12, cellPadding: 6 },
          headStyles: { fillColor: [40, 40, 40], textColor: [255, 255, 255] },
          columnStyles: {
            0: { cellWidth: 'auto' },
            1: { cellWidth: 30, halign: 'center' },
            2: { cellWidth: 40, halign: 'right' },
            3: { cellWidth: 40, halign: 'right' }
          }
        });
        
        // Get the final Y position after the table
        // @ts-ignore
        const finalY = doc.lastAutoTable.finalY + 10;
        
        // Notes and terms
        const notesStartY = finalY + 40;
        
        // Notes section
        if (invoiceData.notes) {
          doc.setFontSize(10);
          doc.setTextColor(80, 80, 80);
          doc.text('Notes', 15, notesStartY);
          doc.setFontSize(12);
          doc.setTextColor(40, 40, 40);
          doc.text(invoiceData.notes, 15, notesStartY + 10);
        }
        
        // Payment terms section - moved to bottom beside notes
        if (invoiceData.terms) {
          doc.setFontSize(10);
          doc.setTextColor(80, 80, 80);
          doc.text('Payment Terms', 140, notesStartY);
          doc.setFontSize(12);
          doc.setTextColor(40, 40, 40);
          doc.text(invoiceData.terms, 140, notesStartY + 10);
        }
        
        // Totals
        const total = calculateTotal();
        doc.setFontSize(12);
        doc.text('Subtotal', 140, finalY + 10);
        doc.text(`${currencySymbol}${total.toFixed(2)}`, 190, finalY + 10, { align: 'right' });
        
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('Total', 140, finalY + 25);
        doc.text(`${currencySymbol}${total.toFixed(2)}`, 190, finalY + 25, { align: 'right' });
        doc.setFont('helvetica', 'normal');
        
        // Save the PDF for direct download
        doc.save(`invoice-${invoiceData.invoiceNumber}.pdf`);
        
        toast.success('Invoice generated successfully!', {
          style: {
            background: '#1a1b23',
            color: '#fff',
            border: '1px solid #2d2e3d'
          },
          duration: 5000
        });
      } catch (error) {
        console.error('Detailed error generating invoice:', error);
        toast.error(`Failed to generate invoice: ${error instanceof Error ? error.message : 'Unknown error'}`, {
          style: {
            background: '#1a1b23',
            color: '#fff',
            border: '1px solid #2d2e3d'
          }
        });
      }
      
      // Notes and terms are handled inside the try block above
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="bg-gradient-to-br from-dark-card via-gray-900 to-dark-card rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
        <div className="px-6 py-8">
          <div className="flex items-center justify-between mb-8 animate-slide-down">
            <div className="flex items-center">
              <div className="p-3 bg-blue-600 bg-opacity-20 rounded-lg">
                <FileText className="h-8 w-8 text-blue-500" />
              </div>
              <h2 className="ml-4 text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Create New Invoice
              </h2>
            </div>
            <div className="flex items-center space-x-2 text-gray-400">
              <span className="text-lg font-semibold">
                Total: {getCurrencySymbol(invoiceData.currency)}{calculateTotal().toFixed(2)}
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Logo Upload */}
            <div className="space-y-2 transition-all duration-300 ease-in-out">
              <label className="block text-sm font-medium text-gray-300">Company Logo</label>
              {!logoPreview ? (
                <div
                  {...getRootProps()}
                  className="mt-1 border-2 border-dashed border-gray-700 rounded-xl p-8 hover:border-blue-500 transition-all duration-300 ease-in-out cursor-pointer bg-dark-input hover:bg-gray-800"
                >
                  <input {...getInputProps()} />
                  <div className="flex flex-col items-center">
                    <Upload className="h-10 w-10 text-gray-400 animate-pulse-slow" />
                    <p className="mt-2 text-sm text-gray-400">Drag & drop your logo here, or click to select</p>
                    <p className="text-xs text-gray-500">PNG, JPG up to 2MB</p>
                  </div>
                </div>
              ) : (
                <div className="relative w-40 h-40 rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105">
                  <img src={logoPreview} alt="Logo preview" className="w-full h-full object-contain" />
                  <button
                    type="button"
                    onClick={removeLogo}
                    className="absolute top-2 right-2 p-2 bg-red-500 bg-opacity-80 text-white rounded-full hover:bg-red-600 transition-colors duration-300"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Currency Selector */}
            <div className="mb-6">
              <div className="flex items-center gap-4">
                <div className="w-1/3">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Currency</label>
                  <div className="relative">
                    <button
                      type="button"
                      className="w-full flex items-center justify-between bg-dark-input border border-gray-700 rounded-xl p-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                    >
                      <span>{getCurrencySymbol(invoiceData.currency)} {invoiceData.currency}</span>
                      <ChevronDown className="h-4 w-4 ml-2" />
                    </button>
                    {showCurrencyDropdown && (
                      <div className="absolute z-10 mt-1 w-full bg-gray-800 border border-gray-700 rounded-xl shadow-lg max-h-60 overflow-auto">
                        {currencies.map((currency) => (
                          <button
                            key={currency.code}
                            type="button"
                            className="w-full text-left px-3 py-2 hover:bg-gray-700 transition-colors duration-200 flex items-center text-sm"
                            onClick={() => {
                              setInvoiceData({ ...invoiceData, currency: currency.code });
                              setShowCurrencyDropdown(false);
                            }}
                          >
                            <span className="mr-2">{currency.symbol}</span>
                            <span>{currency.code} - {currency.name}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Invoice Details */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">#</label>
                <input
                  type="text"
                  className="w-full bg-dark-input border border-gray-700 rounded-lg p-3 text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  value={invoiceData.invoiceNumber}
                  onChange={(e) => setInvoiceData({ ...invoiceData, invoiceNumber: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Date</label>
                <input
                  type="date"
                  className="w-full bg-dark-input border border-gray-700 rounded-lg p-3 text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  value={invoiceData.date}
                  onChange={(e) => setInvoiceData({ ...invoiceData, date: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Due Date</label>
                <input
                  type="date"
                  className="w-full bg-dark-input border border-gray-700 rounded-lg p-3 text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  value={invoiceData.dueDate}
                  onChange={(e) => setInvoiceData({ ...invoiceData, dueDate: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">PO Number</label>
                <input
                  type="text"
                  className="w-full bg-dark-input border border-gray-700 rounded-lg p-3 text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  value={invoiceData.poNumber}
                  onChange={(e) => setInvoiceData({ ...invoiceData, poNumber: e.target.value })}
                  placeholder="(optional)"
                />
              </div>
            </div>

            {/* Business Details */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="transition-all duration-300 ease-in-out">
                <label className="block text-sm font-medium text-gray-300">From</label>
                <textarea
                  className="mt-1 block w-full bg-dark-input border border-gray-700 rounded-xl shadow-sm p-4 text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  rows={4}
                  value={invoiceData.from}
                  onChange={(e) => setInvoiceData({ ...invoiceData, from: e.target.value })}
                  placeholder="Who is this from?"
                  style={{ fontWeight: 200 }}
                />
              </div>

              <div className="transition-all duration-300 ease-in-out">
                <label className="block text-sm font-medium text-gray-300">To</label>
                <textarea
                  className="mt-1 block w-full bg-dark-input border border-gray-700 rounded-xl shadow-sm p-4 text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  rows={4}
                  value={invoiceData.to}
                  onChange={(e) => setInvoiceData({ ...invoiceData, to: e.target.value })}
                  placeholder="Who is this to?"
                  style={{ fontWeight: 200 }}
                />
              </div>
            </div>

            {/* Line Items */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-medium text-gray-300">Items</label>
                <button
                  type="button"
                  onClick={addItem}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 bg-opacity-20 text-blue-400 rounded-lg hover:bg-opacity-30 transition-all duration-300"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </button>
              </div>
              
              <div className="space-y-4">
                {invoiceData.items.map((item, index) => (
                  <div 
                    key={index} 
                    className="flex gap-4 items-start p-4 bg-dark-input rounded-xl border border-gray-800 hover:border-gray-700 transition-all duration-300 animate-slide-down"
                  >
                    <input
                      type="text"
                      className="w-3/5 bg-gray-800 border border-gray-700 rounded-lg p-3 text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Description of item/service..."
                      style={{ fontWeight: 200 }}
                      value={item.description}
                      onChange={(e) => {
                        const newItems = [...invoiceData.items];
                        newItems[index].description = e.target.value;
                        setInvoiceData({ ...invoiceData, items: newItems });
                      }}
                    />
                    <input
                      type="number"
                      className="w-20 bg-gray-800 border border-gray-700 rounded-lg p-3 text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Qty"
                      style={{ fontWeight: 200 }}
                      value={item.quantity || ''}
                      onChange={(e) => {
                        const newItems = [...invoiceData.items];
                        newItems[index].quantity = Number(e.target.value);
                        setInvoiceData({ ...invoiceData, items: newItems });
                      }}
                    />
                    <input
                      type="number"
                      className="w-28 bg-gray-800 border border-gray-700 rounded-lg p-3 text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Rate"
                      style={{ fontWeight: 200 }}
                      value={item.rate || ''}
                      onChange={(e) => {
                        const newItems = [...invoiceData.items];
                        newItems[index].rate = Number(e.target.value);
                        setInvoiceData({ ...invoiceData, items: newItems });
                      }}
                    />
                    {invoiceData.items.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeItem(index)}
                        className="p-3 text-red-400 hover:text-red-300 bg-red-500 bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all duration-300"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Notes & Terms */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="transition-all duration-300 ease-in-out">
                <label className="block text-sm font-medium text-gray-300">Notes</label>
                <textarea
                  className="mt-1 block w-full bg-dark-input border border-gray-700 rounded-xl shadow-sm p-4 text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  rows={3}
                  value={invoiceData.notes}
                  onChange={(e) => setInvoiceData({ ...invoiceData, notes: e.target.value })}
                  placeholder="Notes - any relevant information not already covered"
                  style={{ fontWeight: 200 }}
                />
              </div>

              <div className="transition-all duration-300 ease-in-out">
                <label className="block text-sm font-medium text-gray-300">Terms & Conditions</label>
                <textarea
                  className="mt-1 block w-full bg-dark-input border border-gray-700 rounded-xl shadow-sm p-4 text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  rows={3}
                  value={invoiceData.terms}
                  onChange={(e) => setInvoiceData({ ...invoiceData, terms: e.target.value })}
                  placeholder="Terms and conditions - late fees, payment methods, delivery schedule"
                  style={{ fontWeight: 200 }}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-4 px-6 rounded-xl text-sm font-medium transition-all duration-300
                  ${loading 
                    ? 'bg-gray-700 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-500 hover:to-blue-300 transform hover:-translate-y-1 shadow-blue'
                  }`}
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Generating...
                  </div>
                ) : (
                  'Generate Invoice'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};