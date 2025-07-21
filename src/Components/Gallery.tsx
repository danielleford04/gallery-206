import { useState, useEffect } from 'react';
import Details from "./Details";
import Button from "./Button";

const PAGE_LENGTH:number = 6;

export interface ArtObject {
    id: number;
    title: string;
    artistName: string;
    image: string;
    thumbnail: string;
    year: string;
    type: string;
    artistBio: string;
    medium: string;
    location: string;
}

interface GalleryListItemProps {
    artObject: ArtObject,
    key: number;
    onClick: ()=>void;
}

export const GalleryListItem: React.FC<GalleryListItemProps> = ({artObject, onClick}) => {
    let displayArtistNameAndYear: string | null = null;
    if (artObject.year !== "") {
        displayArtistNameAndYear = `By ${artObject.artistName}, ${artObject.year}`
    } else if (artObject.year === "") {
        displayArtistNameAndYear = `By ${artObject.artistName}`;
    }

    return (
        <button onClick={onClick} style={{ background: 'none', border: 'none', display: 'block', textAlign: 'left'}} aria-label={"Click to view details of this gallery piece"}>
            <div style={{ height: '75px', display: 'flex', flexDirection: 'row', alignItems: "center", cursor: "pointer"}}>
                {artObject.thumbnail !== "" &&
                    <img src={artObject.thumbnail} alt="" width={50} height={50}/>
                }
                <div style={{marginLeft: '10px'}}>
                    <h2 style={{fontSize: '1rem', margin: '0'}}>
                        {artObject.title}
                    </h2>
                    {displayArtistNameAndYear &&
                        <div data-testid={"display-artist-and-year"}>
                            {displayArtistNameAndYear}
                        </div>
                    }
                </div>
            </div>
        </button>
    );
};


const Gallery: React.FC = () => {
    const [artIds, setArtIds] = useState<number[] | null>(null)
    const [artObjects, setArtObjects] = useState<ArtObject[]>([])
    const [pageNumber, setPageNumber] = useState<number>(1)
    const [selectedArtObject, setSelectedArtObject] = useState<ArtObject | null>(null)

    useEffect(()=>{
        const fetchArtList = async function() {
            const artCollectionIds = await fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=6')
                .then((response)=>{
                    if (!response.ok) {
                        showErrorAlert()
                        return;
                    }
                    return response.json()
                }).catch((error) => {
                    showErrorAlert()
                    return;
                });
            if (artCollectionIds) {
                setArtIds(artCollectionIds.objectIDs)
            }
        }
        fetchArtList()
    }, [])

    useEffect(()=>{
        const fetchArtDetails = async function() {
            if (artIds) {
                const firstIndex = (pageNumber - 1) * PAGE_LENGTH;
                const lastIndex = firstIndex + PAGE_LENGTH;
                const artIdsToFetch = artIds.slice(firstIndex, lastIndex)
                const artDetails = [];

                for (let artId of artIdsToFetch) {
                    const artDetail = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${artId}`).then((response) => {
                        if (!response.ok) {
                            showErrorAlert()
                        }
                        return response.json()
                    }).catch((error) => {
                        showErrorAlert()
                        return;
                    });

                    if (artDetail) {
                        const artDetailFormatted: ArtObject = {
                            id: artDetail.objectID,
                            title: artDetail.title,
                            artistName: artDetail.artistDisplayName,
                            image: artDetail.primaryImage,
                            thumbnail: artDetail.primaryImageSmall,
                            year: artDetail.objectDate,
                            type: artDetail.objectName,
                            artistBio: artDetail.artistDisplayBio,
                            medium: artDetail.medium,
                            location: artDetail.repository
                        }
                        if (artDetailFormatted.artistName === "") {
                            artDetailFormatted.artistName = "Unknown"
                        }
                        artDetails.push(artDetailFormatted)
                    }
                }
                setArtObjects(artDetails)
            }
        }

        if (artIds && artIds.length>0) {
            fetchArtDetails()
        }
    }, [artIds, pageNumber])

    const showErrorAlert = () => {
        alert("Something went wrong! Please wait one minute and try again")
    };

    return (
        <main style={{width: '100%', margin: 'auto', textAlign: 'center', maxWidth: '500px'}}>
            <h1>Gallery 206</h1>
            {selectedArtObject &&
                <Details artObject={selectedArtObject} onClick={()=>setSelectedArtObject(null)}/>
            }
            {selectedArtObject === null &&
                <div>
                <ul style={{paddingLeft: 0}}>
                    {artObjects.map((artObject) => (
                        <GalleryListItem key={artObject.id}
                                         onClick={() => setSelectedArtObject(artObject)}
                                         artObject={artObject}
                                 />
                    ))}
                </ul>
            {artIds && artIds.length > pageNumber * PAGE_LENGTH &&
                <Button ariaLabel="Load More Gallery Items" onClick={()=>setPageNumber(pageNumber+1)}>Load More</Button>
            }
                </div>
            }
        </main>
    );
};

export default Gallery;
