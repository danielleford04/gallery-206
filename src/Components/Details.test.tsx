import {fireEvent, render, screen} from '@testing-library/react';
import React from 'react';
import Details from './Details';

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

const mockArtObjectMissingOptionalFields = {
    id: 1,
    title: 'Princess Leia and the Forty Thieves',
    artistName: '',
    image: "",
    thumbnail: "",
    year: "",
    type: "",
    artistBio: "",
    medium: "Acrylic on Canvas",
    location: "The Louvre",
}

const mockArtObjectMissingArtist = {
    id: 1,
    title: 'Princess Leia and the Forty Thieves',
    artistName: '',
    image: "www.imageurl.com",
    thumbnail: "",
    year: "1974",
    type: "Painting",
    artistBio: "From a galaxy far, far away",
    medium: "Acrylic on Canvas",
    location: "The Louvre",
}

const mockArtObjectMissingType = {
    id: 1,
    title: 'Princess Leia and the Forty Thieves',
    artistName: 'Captain Quinn, Medicine Woman',
    image: "www.imageurl.com",
    thumbnail: "",
    year: "1974",
    type: "",
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

const mockArtObjectMissingBio = {
    id: 1,
    title: 'Princess Leia and the Forty Thieves',
    artistName: 'Captain Quinn, Medicine Woman',
    image: "www.imageurl.com",
    thumbnail: "",
    year: "1974",
    type: "Painting",
    artistBio: "",
    medium: "Acrylic on Canvas",
    location: "The Louvre",
}

const mockOnClick = jest.fn()

describe('Details view', () => {
    it('should contain the art object title', () => {
        render(<Details artObject={mockArtObject} onClick={mockOnClick} />);
        const title = screen.getByText(mockArtObject.title);
        expect(title).toBeTruthy()
    });

    it('onclick should be called if button is clicked', () => {
        render(<Details artObject={mockArtObject} onClick={mockOnClick} />);
        const button = screen.getByText("Return to Gallery");
        fireEvent.click(button);
        expect(mockOnClick).toHaveBeenCalled()
    });

    it('should display image if image url exists', () => {
        render(<Details artObject={mockArtObject} onClick={mockOnClick} />);
        const image = screen.getByTestId('details-image');
        expect(image).toBeTruthy()
    });

    it('should not have image if image url is missing', () => {
        render(<Details artObject={mockArtObjectMissingOptionalFields} onClick={mockOnClick} />);
        const image = screen.queryAllByTestId('details-image');
        expect(image).toHaveLength(0)
    });

    it('should display type and year correctly - both type and year exist ', () => {
        render(<Details artObject={mockArtObject} onClick={mockOnClick} />);
        const displayTypeAndYear = screen.getByText(`${mockArtObject.type}, ${mockArtObject.year}`);
        expect(displayTypeAndYear).toBeTruthy()
    });

    it('should display type and year correctly - type exists, year is blank ', () => {
        render(<Details artObject={mockArtObjectMissingYear} onClick={mockOnClick} />);
        const displayTypeAndYear = screen.queryByTestId('display-type-and-year');
        expect(displayTypeAndYear).toBeTruthy()
        // suppressing ts-ignore because the previous line contains a null check
        // @ts-ignore
        expect(displayTypeAndYear.textContent).toBe(mockArtObjectMissingYear.type)
    });

    it('should display type and year correctly - year exists, type is blank ', () => {
        render(<Details artObject={mockArtObjectMissingType} onClick={mockOnClick} />);
        const displayTypeAndYear = screen.queryByTestId('display-type-and-year');
        expect(displayTypeAndYear).toBeTruthy()
        // suppressing ts-ignore because the previous line contains a null check
        // @ts-ignore
        expect(displayTypeAndYear.textContent).toBe(mockArtObjectMissingType.year)
    });

    it('should display type and year correctly - type and year are both blank ', () => {
        render(<Details artObject={mockArtObjectMissingOptionalFields} onClick={mockOnClick} />);
        const displayTypeAndYear = screen.queryByTestId('display-type-and-year');
        expect(displayTypeAndYear).toBeFalsy()
    });

    it('should display artist and bio correctly - both artist and bio exist ', () => {
        render(<Details artObject={mockArtObject} onClick={mockOnClick} />);
        const displayTypeAndYear = screen.getByText(`By ${mockArtObject.artistName}, ${mockArtObject.artistBio}`);
        expect(displayTypeAndYear).toBeTruthy()
    });

    it('should display artist and bio correctly - artist exists, bio is blank ', () => {
        render(<Details artObject={mockArtObjectMissingBio} onClick={mockOnClick} />);
        const displayTypeAndYear = screen.queryByTestId('display-artist-and-bio');
        expect(displayTypeAndYear).toBeTruthy()
        // suppressing ts-ignore because the previous line contains a null check
        // @ts-ignore
        expect(displayTypeAndYear.textContent).toBe(`By ${mockArtObjectMissingBio.artistName}`)
    });

    it('should display artist and bio correctly - bio exists, artist is blank ', () => {
        render(<Details artObject={mockArtObjectMissingArtist} onClick={mockOnClick} />);
        const displayTypeAndYear = screen.queryByTestId('display-artist-and-bio');
        expect(displayTypeAndYear).toBeTruthy()
        // suppressing ts-ignore because the previous line contains a null check
        // @ts-ignore
        expect(displayTypeAndYear.textContent).toBe(mockArtObjectMissingArtist.artistBio)
    });

    it('should display artist and bio correctly - artist and bio are both blank ', () => {
        render(<Details artObject={mockArtObjectMissingOptionalFields} onClick={mockOnClick} />);
        const displayTypeAndYear = screen.queryByTestId('display-artist-and-bio');
        expect(displayTypeAndYear).toBeFalsy()
    });
});
