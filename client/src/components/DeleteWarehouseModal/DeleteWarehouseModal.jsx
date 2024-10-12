import React from "react";
import axios from "axios";

import "./DeleteWarehouseModal.scss";
import close from "../../assets/icons/close.svg";

const API_URL = "http://localhost:8080";

const DeleteWarehouseModal = ({ isOpen, closeModal, deleteItem, item }) => {
  return (
    <div className="modal">
      <div className="modal-overlay"></div>
      <div className="modal-body">
        <img
          src={close}
          alt="Delete Icon"
          className="modal__close"
          onClick={closeModal}
        />
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="delete__heading">{`Delete ${item.item_name} warehouse?`}</h1>
          </div>
          <p className="delete__confirm-text">{`Please confirm that you’d like to delete ${item.item_name} from the list of warehouses. You won’t be able to undo this action.`}</p>
          <div className="modal__actions">
            <button onClick={closeModal} className="modal__button--cancel">
              Cancel
            </button>
            <button
              type="button"
              onClick={deleteItem}
              className="modal__button--delete"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteWarehouseModal;
