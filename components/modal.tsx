export interface ModalProps {
  modalTitle: string;
  modalBody: JSX.Element;
  isModalActive: boolean;
  setIsModalActive: React.Dispatch<React.SetStateAction<boolean>>;
  modalAction: any;
  modalActionTitle: string;
}

export const Modal: React.FC<ModalProps> = ({
  modalTitle,
  modalBody,
  isModalActive,
  setIsModalActive,
  modalAction,
  modalActionTitle,
}) => {
  const handleCloseModalClick = () => {
    setIsModalActive(false);
  };

  const handleMainActionClick = () => {
    modalAction();
    setIsModalActive(false);
  };
  return (
    <div className={`modal ${isModalActive && "is-active"}`}>
      <div className="modal-background" onClick={handleCloseModalClick}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{modalTitle}</p>
          <button
            className="delete"
            aria-label="close"
            onClick={handleCloseModalClick}
          ></button>
        </header>
        <section className="modal-card-body">{modalBody}</section>
        <footer className="modal-card-foot">
          <button className="button is-success" onClick={handleMainActionClick}>
            {modalActionTitle}
          </button>
          <button className="button" onClick={handleCloseModalClick}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};
