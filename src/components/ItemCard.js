import React from 'react';
import { LazyLoadImage, trackWindowScroll } from 'react-lazy-load-image-component';
import { Button, Card } from  '@blueprintjs/core';



/**
 * ItemCard Container Component that loads the photos data
 */
export class ItemCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {afterLoadText, beforeLoadText, effect, direction,
      scrollPosition, showLowResImages, threshold, containerWithOverflow
    } = this.props;

    return (
      <div className={ `ItemCard ${direction} ${containerWithOverflow ? 'with-overflow' : ''}` }>
          <LazyLoadImage
            alt={photo.src}
            afterLoad={() => console.log(afterLoadText)}
            beforeLoad={() => console.log(beforeLoadText)}
            className="ItemCard-img"
            effect={effect}
            height={384}
            key={photo.src}
            placeholderSrc={showLowResImages ? photo.lowResSrc : null}
            scrollPosition={scrollPosition}
            src={photo.src}
            threshold={threshold}
            width={512}
            wrapperClassName="ItemCard-img-wrapper" />
      </div>
    );
  }
}

export default trackWindowScroll(ItemCard);