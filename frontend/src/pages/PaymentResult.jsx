import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import config from "../config/config";
import { useNavigate } from "react-router-dom";
import { getUserToken } from "../utils/token";
import jsPDF from "jspdf";
import { FaCheckCircle } from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5";
import { toast, ToastContainer } from "react-toastify";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ReviewPanel from "../components/ReviewPanel";
import { FaChevronDown } from "react-icons/fa6";

const PaymentResult = () => {
  const [paymentInfo, setPaymentInfo] = useState({});
  const [rideInfo, setRideInfo] = useState({});
  const [reviewPanel, setReviewPanel] = useState(false);
  const reviewPanelRef = useRef(null);
  const toastShown = useRef(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sessionId = sessionStorage.getItem("sessionId");
  const navigate = useNavigate();
  const token = getUserToken();

  useEffect(() => {
    if (!sessionId) return navigate("/");

    const fetchPaymentInfo = async () => {
      try {
        const response = await axios.get(
          `${config.baseUrl}/api/payment/getPaymentInfo`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              sessionId: sessionId,
            },
          }
        );
        setPaymentInfo(response.data.session);
        setRideInfo(response.data.paymentDetails?.ride);

        if (!toastShown.current) {
          toast.dismiss();
          toast.info("Click here to rate your ride", {
            onClick: () => {
              setReviewPanel(true);
              toast.dismiss(); // Dismiss only this specific toast
            },
            closeOnClick: true
          });
          toastShown.current = true; // Prevents multiple toasts
        }

        await axios.post(
          `${config.baseUrl}/api/payment/updatePaymentStatus`,
          { paymentId: sessionId, status: response.data.session.status },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (err) {
        setError("Failed to fetch payment information");
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentInfo();
  }, [sessionId]);

  useGSAP(() => {
    if (reviewPanel) {
      gsap.to(reviewPanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(reviewPanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [reviewPanel]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const downloadPdf = () => {
    const doc = new jsPDF();
    doc.text(`Payment ID: ${paymentInfo.id}`, 10, 10);
    doc.text(`Status: ${paymentInfo.status}`, 10, 20);
    doc.text(`Amount: ${paymentInfo.amount_total / 100}`, 10, 30);
    doc.text(`Currency: ${paymentInfo.currency}`, 10, 40);
    doc.save("payment_details.pdf");
  };

  return (
    <div className="min-h-screen flex justify-center items-center ">
      <ToastContainer theme="dark" closeOnClick={true} draggable={true} />
      <div className="box flex flex-col justify-center items-center gap-5 shadow-2xl rounded-lg p-5 w-[90%] md:w-96">
        <div className="icon">
          {paymentInfo.status === "complete" ? (
            <FaCheckCircle className="size-16 text-[#2ee237]" />
          ) : (
            <IoCloseCircle className="size-16 text-red-500" />
          )}
        </div>

        <div className="text text-center font-bold text-black">
          {paymentInfo.status === "complete" ? (
            <div>
              Payment successful. Your transaction has been processed. Thank you
              for your payment.
            </div>
          ) : paymentInfo.status === "failed" ? (
            <div>
              Payment failed. Please try again or contact our support team for
              assistance.
            </div>
          ) : paymentInfo.status === "pending" ? (
            <div>
              Payment is pending. Please wait for the payment to be processed.
            </div>
          ) : (
            <div>
              Unknown payment status. Please contact our support team for
              assistance.
            </div>
          )}
        </div>

        <div className="flex flex-col w-full gap-3">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={downloadPdf}
          >
            Download payment receipt
          </button>
          <button
            className="bg-yellow-300 hover:bg-black text-white font-bold py-2 px-4 rounded"
            onClick={() => navigate("/")}
          >
            Back To Home
          </button>
        </div>
      </div>

      <div
        ref={reviewPanelRef}
        className="fixed lg:sticky w-full z-10 bottom-0 translate-y-full bg-white px-3 py-5 pt-1"
      >
        <div className="flex justify-center items-center">
        <button
          onClick={() => setReviewPanel(false)}
          className="w-fit h-10 mx-auto align-middle px-10 py-2 rounded-md"
        >
          <FaChevronDown className="size-5" />
        </button>
        </div>
        <ReviewPanel />
      </div>
    </div>
  );
};

export default PaymentResult;
