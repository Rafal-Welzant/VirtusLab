import React from 'react'

const PokemonThumb = ({id, image, name, type, weight, height, isExpanded, toggleDetailsId, }) => {
    
    
    
    
    const style = type + " thumb-container";
    return (
        <div className={style}>
            <div className="number"><small>#0{id}</small></div>
            <img src={image} alt={name} />
            <div className="detail-wrapper">
                <h3>{name}</h3>
                <small>Type: {type}</small>  
                <button onClick={() => toggleDetailsId(id)}>
                  {!isExpanded ? "Show details" : "Hide details"}
                </button>
            </div>
        </div>
    )
}

export default PokemonThumb