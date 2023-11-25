import { Hearts } from 'react-loader-spinner';
import { StyledLoader } from 'components/Loader/StyledLoader';

const Loader = () => {
  return (
    <StyledLoader>
      <Hearts
        height="120"
        width="120"
        color="#369baf"
        ariaLabel="hearts-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </StyledLoader>
  );
};

export default Loader;
