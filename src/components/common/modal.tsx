import { Modal } from 'antd';
import { GenericModalProps } from '../../types/modal';


const GenericModal = ({ visible, onClose, title, children }:GenericModalProps) => {
  return (
    <Modal title={title} visible={visible} onCancel={onClose} footer={null} width={1000}>
      {children}
    </Modal>
  );
};

export default GenericModal;
