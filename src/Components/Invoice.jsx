import React, { useEffect, useRef } from "react";
import logo from "/logo.png";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { LoadSingleOrder } from "../Actions/Order";
import { LoadInvoice } from "../Actions/Invoice";
import { FaRupeeSign } from "react-icons/fa";
import { LoadAdminImages } from "../Actions/AdminImg";
import { loadUser } from "../Actions/User";

const Invoice = () => {
  const { singleInvoice } = useSelector((state) => state.invoice);
  const { adminImages } = useSelector((status) => status.adminImg);
  const { order } = useSelector((state) => state.order);
  const {user}=useSelector((state)=>state.user)
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(LoadInvoice(id));
    dispatch(LoadAdminImages());
    dispatch(loadUser())
    dispatch(LoadSingleOrder(id));
    
  }, [dispatch, id]);

  console.log(order);
  
  const printPdf = useRef(null);

  const pdfDownloadHandler = async () => {
    const inputData = printPdf.current;
    try {
      const canvas = await html2canvas(inputData, {
        scale: 3, // Higher scale for better resolution
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgProperties = pdf.getImageProperties(imgData);
      const imgWidth = imgProperties.width;
      const imgHeight = imgProperties.height;

      const scaleFactor = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

      const scaledWidth = imgWidth * scaleFactor;
      const scaledHeight = imgHeight * scaleFactor;

      const xOffset = (pdfWidth - scaledWidth) / 2;
      const yOffset = (pdfHeight - scaledHeight) / 2;

      pdf.addImage(imgData, "PNG", xOffset, yOffset, scaledWidth, scaledHeight);
      pdf.save("Invoice.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 p-4 md:p-8 flex flex-col items-center">
      <div
        ref={printPdf}
        className="bg-white shadow-lg rounded-lg p-4 md:p-6 w-full max-w-3xl"
      >
        <div className="p-4 md:p-8 bg-white border border-gray-200">
          <div className="flex flex-row justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">INVOICE</h1>
              <p className="text-sm text-gray-600">Invoice #INV-{singleInvoice?._id}</p>
              <div className="flex flex-col gap-2 mt-8">
              <p className="text-sm font-medium">Order Date : {new Date(order?.createdAt).toLocaleDateString()}</p>
              <p className="text-sm font-medium">Invoice Date : {new Date(singleInvoice?.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
            <Link to="/" className="mt-4 md:mt-0 text-center md:text-right">
              <img
                className="w-24 h-16 md:w-36 md:h-20"
                src={adminImages[0]?.logoImg?.url}
                alt="Company Logo"
              />
            </Link>
          </div>

          <div className="flex justify-between ">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Bill To:</h3>
            <p className="text-gray-700">
              {order?.user?.username}
              <br />
              Phone +91 {order?.user?.phone}
              <br />
              {order?.user?.email}
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Shipping Address:</h3>
            <p className="text-gray-700">
              {order?.deliveryAddress?.name}
              <br />
              Phone +91 {order?.deliveryAddress?.phone}
              <br />
              {order?.deliveryAddress?.address?.split(",").map((line, index) => (
                <React.Fragment key={index}>
                  {line.trim()}
                  <br />
                </React.Fragment>
              ))}
              {order?.deliveryAddress?.city} - {order?.deliveryAddress?.pincode}
              <br />
              {order?.deliveryAddress?.state}
              <br />
              {order?.deliveryAddress?.country}
            </p>
          </div>
          </div>

          <table className="w-full mb-6 border-collapse">
            <thead>
              <tr className="bg-gray-100 text-sm md:text-base">
                <th className="border p-2 text-center w-3/24">Description</th>
                <th className="border p-2 text-center w-1/24">Qty</th>
                <th className="border p-2 text-center w-1/24">Unit Price (Excl. IGST)</th>
                <th className="border p-2 text-center w-1/24">Total (Excl. IGST)</th>
                <th className="border p-2 text-center w-1/24">IGST (18%)</th>
                <th className="border p-2 text-center w-1/24">Total (Incl. IGST)</th>
              </tr>
            </thead>
            {order &&
              order?.orderItems?.map((items) => {
                const { product, quantity } = items;
                const { _id, productName, description, basePrice, tax, price, images } = product;

                // Calculate unit price without GST
                const priceWithoutGST = basePrice               // Calculate total without GST
                const totalWithoutGST = priceWithoutGST * quantity;

                // Calculate GST
                const gstAmount = totalWithoutGST * (tax / 100);

                // Calculate total with GST
                const totalWithGST = totalWithoutGST + gstAmount;

                return (
                  <tbody key={_id}>
                    <tr className="text-sm md:text-base">
                      <td className="border p-2">
                        {productName} <br /> {description}
                      </td>
                      <td className="border p-2 text-center">{quantity}</td>
                      <td className="border p-2 text-center">₹ {priceWithoutGST.toFixed(2)}</td>
                      <td className="border p-2 text-center">₹ {totalWithoutGST.toFixed(2)}</td>
                      <td className="border p-2 text-center">₹ {gstAmount.toFixed(2)}</td>
                      <td className="border p-2 text-center">₹ {totalWithGST.toFixed(2)}</td>
                    </tr>
                  </tbody>
                );
              })}
            <tfoot>
              <tr className="font-bold text-sm md:text-base bg-gray-100">
                <td className="border p-2 text-right" colSpan="5">
                  Total (Incl. IGST):
                </td>
                <td className="border p-2 text-center">
                  &#8377; {order?.orderItems?.reduce((sum, item) => {
                    const totalWithoutGST = item.product.basePrice * item.quantity;
                    const gstAmount = totalWithoutGST * (item.product.tax / 100);
                    const totalWithGST = totalWithoutGST + gstAmount;
                    return sum + totalWithGST;
                  }, 0).toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>

          <div className="flex justify-end">
            <div className="w-full max-w-sm">
              <div className="flex justify-between mb-2">
                <span>Subtotal:</span>
                <span>₹ {order?.orderItems?.reduce((sum, item) => {
                    const totalWithoutGST = item.product.basePrice * item.quantity;
                    const gstAmount = totalWithoutGST * (item.product.tax / 100);
                    const totalWithGST = totalWithoutGST + gstAmount;
                    return sum + totalWithGST;
                  }, 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Subtotal (round up):</span>
                <span>₹ {order?.total}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping:</span>
                <span>₹ {order?.shippingCharges}</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total (Incl. GST):</span>
                <span>₹ {order?.totalAmount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-center">
        <button
          onClick={pdfDownloadHandler}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default Invoice;
