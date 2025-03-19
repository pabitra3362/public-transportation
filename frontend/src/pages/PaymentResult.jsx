
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config/config';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserToken } from '../utils/token';
import jsPDF from 'jspdf';

const PaymentResult = () => {
  const [paymentInfo, setPaymentInfo] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sessionId = sessionStorage.getItem('sessionId')
  const { paymentResult } = useParams();
  const navigate = useNavigate();
  const token = getUserToken();


  useEffect(() => {

      if(!sessionId) return navigate('/');
      
    const fetchPaymentInfo = async () => {
      try {
        const response = await axios.get(`${config.baseUrl}/api/payment/getPaymentInfo`,{
          headers: {
            Authorization: `Bearer ${token}`
          },
          params:{
            sessionId: sessionId
          }
        });
        setPaymentInfo(response.data.session);
      } catch (err) {
        setError('Failed to fetch payment information');
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentInfo();
  }, [sessionId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const downloadPdf = () => {
    const doc = new jsPDF();
    doc.text(`Payment ID: ${paymentInfo.id}`, 10, 10);
    doc.text(`Status: ${paymentInfo.status}`, 10, 20);
    doc.text(`Amount: ${paymentInfo.amount_total/100}`, 10, 30);
    doc.text(`Currency: ${paymentInfo.currency}`, 10, 40);
    doc.save('payment_details.pdf');
  };

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-6 lg:p-8 xl:p-10">
  <h1 className="text-3xl font-bold mb-4">Payment Result</h1>
  {paymentInfo ? (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6 lg:p-8 xl:p-10">
      <p className="text-lg font-medium mb-2 text-wrap">Payment ID: {paymentInfo.id}</p>
      <p className="text-lg font-medium mb-2">Status: {paymentInfo.status}</p>
      <p className="text-lg font-medium mb-2">Amount: {paymentInfo.amount_total/100}</p>
      <p className="text-lg font-medium mb-2">Currency: {paymentInfo.currency}</p>
      <div className='flex flex-col w-full gap-3'>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={downloadPdf}>Download as PDF</button>
      <button className="bg-yellow-300 hover:bg-black text-white font-bold py-2 px-4 rounded" onClick={()=>navigate('/')}>Back To Home</button>
      </div>
    </div>
  ) : (
    <p className="text-lg font-medium text-gray-500">No payment information available.</p>
  )}
</div>
  );
};

export default PaymentResult;
