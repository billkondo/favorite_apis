import { Button } from 'antd';

import FREETOGAME_KEY from './FreeToGameKey';

const FreeToGameRenderButton = (onClick: () => void) => {
  return (
    <Button onClick={onClick} size="large" title={`${FREETOGAME_KEY} BUTTON`}>
      FREETOGAME
    </Button>
  );
};

export default FreeToGameRenderButton;