import { useSelector } from 'react-redux';
import './Genres.scss';
import PropTypes from 'prop-types';

const Genres = ({data}) => {

    const {genres} = useSelector(state => state.home);

    

  return (
    <div className='genres'>
        {
            data?.map((g,index) => {

                if(!genres[g]?.name) return;

                return (
                    <div className="genre" key={index}>
                        {genres[g]?.name}
                    </div>
                )
            })
        }
    </div>
  )
}

Genres.propTypes = {
    data:PropTypes.array
}

export default Genres;