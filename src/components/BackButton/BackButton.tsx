import React, { CSSProperties } from "react";
import { BiArrowBack } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

interface BackButtonProps {
  style?: CSSProperties; 
}

// BackButton general component
const BackButton: React.FC<BackButtonProps> = ({ style}) => {
  const navigate = useNavigate();

  // Function to handle the back navigation
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="back-btn" onClick={handleGoBack} style={style}>
      <BiArrowBack className="back-btn-icon" />
    </div>
  );
};

export default BackButton;
