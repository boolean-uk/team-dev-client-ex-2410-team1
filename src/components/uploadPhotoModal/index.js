import useModal from '../../hooks/useModal';
import Button from '../button';

const UploadPhotoModal = () => {
  const { closeModal } = useModal();
  return (
    <>
      <p>Choose a file to upload for your headshot</p>
      <div>
        <Button text={'Cancel'} onClick={closeModal} />
        <Button text={'Choose file'} />
      </div>
    </>
  );
};

export default UploadPhotoModal;
