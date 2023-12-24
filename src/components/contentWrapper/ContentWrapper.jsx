import './ContentWrapper.scss';
import PropTypes from 'prop-types';

const ContentWrapper = ({ children }) => {
    return <div className="contentWrapper">{children}</div>;
};

ContentWrapper.propTypes = {
    children: PropTypes.node,
}

export default ContentWrapper;


