import React, {Component} from 'react';


class Homepage extends Component {
    render() {
        return (
          // <div className="row">
          // <img className="d-block w-100 img-fluid" id="dog" src={'/static/assets/andrew-pons-9.jpg'} />
          // </div>
        <div className="container-fluid">
           <div className="row">
             <div className="col-sm-12">
               <div id="my-slider" className="carousel slide" data-ride="carousel">
                 <ol className="carousel-indicators">
                  <li data-target="#my-slider" data-slide-to="0" className="active"></li>
                  <li data-target="#my-slider" data-slide-to="1"></li>
                  <li data-target="#my-slider" data-slide-to="2"></li>
                </ol>
                <div className="carousel-inner" role="listbox">
                <div className="item active">
                <img id="cute-dog" src={'/static/assets/cute-dog.jpg'} alt="first slide"/>
                <div className="carousel-caption">
                <h1>Schedule trips fror your Paw Mate</h1>
                </div>
              </div>
              <div className="item">
                <img id="dog" src={'/static/assets/andrew-pons-9.jpg'} alt="Second slide"/>
                <div className="carousel-caption">
                <h1>Second slide</h1>
                </div>
              </div>
              <div className="item">
                <img id="dog2" src={'/static/assets/andrew-pons-9.jpg'} alt="Third slide"/>
                <div className="carousel-caption">
                <h1>Third slide</h1>
                </div>
              </div>
            </div>
            <a className="left carousel-control" href="#myslider" role="button" data-slide="prev">
              <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
              <span className="sr-only">Previous</span>
            </a>
            <a className="right carousel-control" href="#myslider" role="button" data-slide="next">
              <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
              <span className="sr-only">Next</span>
            </a>
           </div>
          </div>
        </div>
      </div>

        );
    }
}

export default Homepage;
