import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import React from 'react';
import Gallery, {GalleryListItem} from './Gallery';
import {mockArtObjectResponse1, mockArtObjectResponse2, mockArtObjectResponse3, mockArtObjectResponse4, mockArtObjectResponse5, mockArtObjectResponse6} from "../../data/mockArtObject";

export function mockFetch(data: any) {
    return jest.fn().mockImplementation(() =>
        Promise.resolve({
            ok: true,
            json: () => data,
        }),
    );
}

const artIdsResponse = {
    total: 6,
    objectIDs: [0,1,2,3,4,5]
}

describe('Gallery tests', () => {
    beforeEach(() => {
        global.fetch = jest.fn(); // Reset the mock before each test
    });

    it('should fetch data successfully and component should work appropriately with fetched data', async () => {
        global.fetch = jest.fn()
            .mockImplementationOnce(() =>
                // mock the call to fetch art object ids
                Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve( artIdsResponse ),
                } as Response)
            )
            // mock the call to fetch 1/6 art object details
            .mockImplementationOnce(() =>
                Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve(mockArtObjectResponse1 ),
                } as Response)
            )
            // mock the call to fetch 2/6 art object details
            .mockImplementationOnce(() =>
                    Promise.resolve({
                        ok: true,
                        json: () => Promise.resolve( mockArtObjectResponse2 ),
                    } as Response)
                )
            // mock the call to fetch 3/6 art object details
            .mockImplementationOnce(() =>
                Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve(mockArtObjectResponse3 ),
                } as Response)
            )
            // mock the call to fetch 4/6 art object details
            .mockImplementationOnce(() =>
                Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve( mockArtObjectResponse4 ),
                } as Response)
            )
            // mock the call to fetch 5/6 art object details
            .mockImplementationOnce(() =>
                Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve(mockArtObjectResponse5 ),
                } as Response)
            )
            // mock the call to fetch 6/6 art object details
            .mockImplementationOnce(() =>
                Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve( mockArtObjectResponse6 ),
                } as Response)
            );

        //This act is necessary for the tests to work.
        //In a workplace, I would probably spend some time diving into why that's a lint error
        // and if there is a better way to do this,
        // but for the sake of a coding assignment, after trying 4-5 different suggestions from Stack Overflow,
        // this is the only one that cleared a different error and allowed the component to fully render and
        // subsequent tests to be run.
        // eslint-disable-next-line testing-library/no-unnecessary-act
        await act( async () => render(<Gallery/>));

        // api calls are all made correctly
        expect(global.fetch).toHaveBeenCalledTimes(7);
        expect(global.fetch).toHaveBeenCalledWith('https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=6');
        expect(global.fetch).toHaveBeenCalledWith('https://collectionapi.metmuseum.org/public/collection/v1/objects/0');
        expect(global.fetch).toHaveBeenCalledWith('https://collectionapi.metmuseum.org/public/collection/v1/objects/1');
        expect(global.fetch).toHaveBeenCalledWith('https://collectionapi.metmuseum.org/public/collection/v1/objects/2');
        expect(global.fetch).toHaveBeenCalledWith('https://collectionapi.metmuseum.org/public/collection/v1/objects/3');
        expect(global.fetch).toHaveBeenCalledWith('https://collectionapi.metmuseum.org/public/collection/v1/objects/4');
        expect(global.fetch).toHaveBeenCalledWith('https://collectionapi.metmuseum.org/public/collection/v1/objects/5');

        //header renders
        const heading = screen.getByText(/Gallery 206/i);
        expect(heading).toBeTruthy()

        //renders gallery view on default, and loaded objects are rendered
        const mockResponseArtObjectName = screen.getAllByText(mockArtObjectResponse4.title);
        expect(mockResponseArtObjectName).toBeTruthy()

        //switches to details view if you click 'details' view for the piece
        const artObjectButtons = screen.getAllByLabelText('Click to view details of this gallery piece')
        const firstArtObjectButton = artObjectButtons[0]
        fireEvent.click(firstArtObjectButton);
        const artRepository = screen.getByText(`Located at: ${mockArtObjectResponse1.repository}`);
        expect(artRepository).toBeTruthy()
    });
});

const mockArtObject = {
    id: 1,
    title: 'Princess Leia and the Forty Thieves',
    artistName: 'Captain Quinn, Medicine Woman',
    image: "www.imageurl.com",
    thumbnail: "",
    year: "1974",
    type: "Painting",
    artistBio: "From a galaxy far, far away",
    medium: "Acrylic on Canvas",
    location: "The Louvre",
}

const mockArtObjectMissingYear = {
    id: 1,
    title: 'Princess Leia and the Forty Thieves',
    artistName: 'Captain Quinn, Medicine Woman',
    image: "www.imageurl.com",
    thumbnail: "",
    year: "",
    type: "Painting",
    artistBio: "From a galaxy far, far away",
    medium: "Acrylic on Canvas",
    location: "The Louvre",
}

const mockOnClick = jest.fn()

describe('Gallery List Item tests', () => {
    it('should contain the art object title', () => {
        render(<GalleryListItem key={mockArtObject.id} artObject={mockArtObject} onClick={mockOnClick} />);
        const title = screen.getByText(mockArtObject.title);
        expect(title).toBeTruthy()
    });

    it('onclick should be called if button is clicked', () => {
        render(<GalleryListItem key={mockArtObject.id} artObject={mockArtObject} onClick={mockOnClick} />);
        const button = screen.getByLabelText("Click to view details of this gallery piece");
        fireEvent.click(button);
        expect(mockOnClick).toHaveBeenCalled()
    });

    it('should display artist and year correctly - both artist and year exist ', () => {
        render(<GalleryListItem key={mockArtObject.id} artObject={mockArtObject} onClick={mockOnClick} />);
        const displayArtistAndYear = screen.getByText(`By ${mockArtObject.artistName}, ${mockArtObject.year}`);
        expect(displayArtistAndYear).toBeTruthy()
    });

    it('should display artist and year correctly - artist exists, year is blank ', () => {
        render(<GalleryListItem key={mockArtObject.id} artObject={mockArtObjectMissingYear} onClick={mockOnClick} />);
        const displayArtistAndYear = screen.queryByTestId('display-artist-and-year');
        expect(displayArtistAndYear).toBeTruthy()
        // suppressing ts-ignore because the previous line contains a null check
        // @ts-ignore
        expect(displayArtistAndYear.textContent).toBe(`By ${mockArtObjectMissingYear.artistName}`)
    });
});
