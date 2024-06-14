import { render, fireEvent } from '@testing-library/react';

//import { test,describe,expect } from '@testing-library/react';


import {  screen } from '@testing-library/react';
import {Calculator} from '../../src/components/Calculator' // Import the 'Calculator' component


describe('Calculator', () => {

    test('should render without crashing', () => {
        render(<Calculator />);
        const linkElement = screen.getByText(/Calculadora/i);
        expect(linkElement).toBeInTheDocument();
    });

});