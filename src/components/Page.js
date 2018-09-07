import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './page.css';

const getButton = (props) => <button 
                                key={props.year} 
                                className={props.selected ? 'button selected' : 'button' }  
                                onClick={props.handleClick.bind(props.scope, props.year)}
                             >
                             {props.year}
                             </button>;

export default class Page extends Component {
    
    onYearButtonClick (year) {
        //this.props.setYear(year);
        this.props.getPhotos(year);
    }

    getPhotosTitle() {
        const {fetching, year, photos} = this.props;
        console.log('getPhotosContent', this.props)
        return (
            <div className='title'>
            {
                fetching ? 
                    "Loading ..." :
                    year ? `You have ${photos.length} photos.` :  ""
            }            
            </div>
        );
    }

    getImageContent(url) {
        return <img key={url} alt='' src={url} />;
    }

    getPhotosContent() {
        const {fetching, year, photos} = this.props;
        return  <div className='image'>
                { (fetching || !year) ? '' : photos.map(photo => this.getImageContent(photo.photo_75)) }
                </div>;
    }

    render() {
        const {year, years} = this.props;
        return <div>                    
                    <div>
                        { 
                            years.map(y => getButton({
                                                scope:this, 
                                                year:y, 
                                                handleClick: this.onYearButtonClick,
                                                selected: y === year
                                            })) 
                        }
                    </div>
                    {  this.getPhotosTitle()  }
                    {  this.getPhotosContent()  }
                </div>
    }
}

Page.propTypes = {
    years: PropTypes.array.isRequired,
    photos: PropTypes.array.isRequired,
    getPhotos: PropTypes.func.isRequired,
    fetching: PropTypes.bool.isRequired
};