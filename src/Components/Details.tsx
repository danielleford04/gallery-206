import { ArtObject } from "./Gallery";
import Button from "./Button";

interface ArtDetailProps {
    artObject: ArtObject,
    onClick: ()=>void;
}

const ArtDetail: React.FC<ArtDetailProps> = ({artObject, onClick}) => {
    let displayTypeAndYear: string | null = null;
    if (artObject.type !== "" && artObject.year !== "") {
        displayTypeAndYear = `${artObject.type}, ${artObject.year}`
    } else if (artObject.type !== "" && artObject.year === "") {
        displayTypeAndYear = artObject.type;
    } else if (artObject.type === "" && artObject.year !== "") {
        displayTypeAndYear = artObject.year
    }

    let displayArtistNameAndBio: string | null = null;
    if (artObject.artistName !== "" && artObject.artistBio !== "") {
        displayArtistNameAndBio = `By ${artObject.artistName}, ${artObject.artistBio}`
    } else if (artObject.artistName !== "" && artObject.artistBio === "") {
        displayArtistNameAndBio = `By ${artObject.artistName}`;
    } else if (artObject.artistName === "" && artObject.artistBio !== "") {
        displayArtistNameAndBio = artObject.artistBio
    }

    return (
        <div>
            {artObject.image !== "" &&
                <div style={{maxWidth: "500px", width: "100%"}}>
                <img src={artObject.image} alt="" style={{maxHeight: '50vh', maxWidth: '95%', width: 'auto', margin: '15px'}} data-testid={'details-image'}/>
                </div>
            }
            <div>
                <h2 style={{fontSize: '1rem', margin: '0'}}>
                    {artObject.title}
                </h2>
                {displayTypeAndYear &&
                    <div data-testid={'display-type-and-year'}>
                        {displayTypeAndYear}
                    </div>
                }
                <div>
                    {artObject.medium}
                </div>
                {displayArtistNameAndBio &&
                    <div data-testid={'display-artist-and-bio'}>
                        {displayArtistNameAndBio}
                    </div>
                }
                <div>
                    Located at: {artObject.location}
                </div>
            </div>
            <Button ariaLabel={"Return to Gallery"} onClick={onClick}>Return to Gallery</Button>
        </div>
    );
};

export default ArtDetail;
