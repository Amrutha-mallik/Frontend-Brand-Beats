import { useFormik } from "formik";
import axios from "../config/a";
import "../Styles/proposal.css";

export default function Proposal({ projectId, closeForm }) {

  const formik = useFormik({
    initialValues: {
      proposalText: "",
      priceOffer: "",
      proposalResume: null,
      attachments: [],
    },

    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("proposalText", values.proposalText);
        formData.append("priceOffer", Number(values.priceOffer));
        formData.append("projectId", projectId);
        formData.append("status", "Pending");

        if (values.proposalResume) {
          formData.append("proposalResume", values.proposalResume);
        }

        for (let file of values.attachments) {
          formData.append("attachments", file);
        }

        const response = await axios.post("/proposals", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: localStorage.getItem("token"),
          },
        });

        alert("Proposal sent successfully!");
        console.log(response.data);
        closeForm();

      } catch (err) {
        console.log(err);
        alert("Error sending proposal");
      }
    },
  });

  return (
    <div className="proposal-form-container">
      <h2>Send Proposal</h2>

      <form onSubmit={formik.handleSubmit}>

        <div className="form-group">
          <label>Proposal Text</label>
          <textarea
            name="proposalText"
            value={formik.values.proposalText}
            onChange={formik.handleChange}
            placeholder="Describe your proposal in detail..."
          />
        </div>

        <div className="form-group">
          <label>Price Offer</label>
          <input
            type="number"
            name="priceOffer"
            value={formik.values.priceOffer}
            onChange={formik.handleChange}
            placeholder="Enter your price offer"
          />
        </div>

        <div className="form-group">
          <label>Upload Resume (PDF / DOC)</label>
          <input
            type="file"
            name="proposalResume"
            onChange={(e) => formik.setFieldValue("proposalResume", e.target.files[0])}
          />
        </div>

        <div className="form-group">
          <label>Attachments (Images / Files)</label>
          <input
            type="file"
            multiple
            name="attachments"
            onChange={(e) => formik.setFieldValue("attachments", e.target.files)}
          />
        </div>

        <div className="form-button-group">
          <button type="submit" className="proposal-submit-btn">
            Send Proposal
          </button>
          <button type="button" className="proposal-close-btn" onClick={closeForm}>
            Cancel
          </button>
        </div>

      </form>
    </div>
  );
}