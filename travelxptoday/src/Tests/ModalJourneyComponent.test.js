import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import ModalJourneyComponent,{handleSubmit} from '../Components/ModalJourneyComponent';
import userEvent from '@testing-library/user-event';
beforeAll(() => {
    global.Element.prototype.animate = jest.fn();
  });

describe('ModalJourneyComponent', () => {
  it('renders correctly', () => {
    render(<ModalJourneyComponent refresh={() => {}} />);

    expect(screen.getByTestId('name')).toBeInTheDocument();
    expect(screen.getByTestId('startDate')).toBeInTheDocument();
    expect(screen.getByTestId('endDate')).toBeInTheDocument();
    expect(screen.getByTestId('startLocation')).toBeInTheDocument();
    expect(screen.getByTestId('destination')).toBeInTheDocument();
    expect(screen.getByTestId('transportation')).toBeInTheDocument();
    expect(screen.getByTestId('description')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create journey/i })).toBeInTheDocument();
  });
  it('allows the user to fill in the form', async () => {
    render(<ModalJourneyComponent refresh={() => {}} />);
    userEvent.type(screen.getByTestId('name'), 'Test Journey');
    userEvent.type(screen.getByTestId('startDate'), '2023-12-25');
    userEvent.type(screen.getByTestId('endDate'), '2023-12-30');
    userEvent.type(screen.getByTestId('startLocation'), 'New York');
    userEvent.type(screen.getByTestId('destination'), 'Los Angeles');
    userEvent.type(screen.getByTestId('description'), 'A memorable journey');
    userEvent.type(screen.getByTestId('transportation'), 'Car');
  

    expect(screen.getByTestId('name')).toHaveValue('Test Journey');
    expect(screen.getByTestId('startDate')).toHaveValue('2023-12-25');
    expect(screen.getByTestId('endDate')).toHaveValue('2023-12-30');
    expect(screen.getByTestId('startLocation')).toHaveValue('New York');
    expect(screen.getByTestId('destination')).toHaveValue('Los Angeles');
    expect(screen.getByTestId('description')).toHaveValue('A memorable journey');
    expect(screen.getByTestId('transportation')).toHaveValue('Car');
  });

  it('submits the form when all data is correct', async () => {
    const handleSubmit = jest.fn();
    render(<ModalJourneyComponent refresh={() => {}} onSubmit={handleSubmit} />);

    userEvent.type(screen.getByTestId('name'), 'Test Journey');
    userEvent.type(screen.getByTestId('startDate'), '2023-12-25');
    userEvent.type(screen.getByTestId('endDate'), '2023-12-30');
    userEvent.type(screen.getByTestId('startLocation'), 'New York');
    userEvent.type(screen.getByTestId('destination'), 'Los Angeles');
    userEvent.type(screen.getByTestId('description'), 'A memorable journey');
    userEvent.type(screen.getByTestId('transportation'), 'Car');

    expect(screen.getByTestId('name')).toHaveValue('Test Journey');
    userEvent.click(screen.getByRole('button', { name: /create journey/i }));
    await waitFor(() => {
        expect(handleSubmit).toHaveBeenCalled();
    });
  });
  it('Returns an error when name is wrong', async () => {
    const handleSubmit = jest.fn();
    render(<ModalJourneyComponent refresh={() => {}} onSubmit={handleSubmit} />);

    userEvent.type(screen.getByTestId('name'), '');
    userEvent.type(screen.getByTestId('startDate'), '2023-12-25');
    userEvent.type(screen.getByTestId('endDate'), '2023-12-30');
    userEvent.type(screen.getByTestId('startLocation'), 'New York');
    userEvent.type(screen.getByTestId('destination'), 'Los Angeles');
    userEvent.type(screen.getByTestId('description'), 'A memorable journey');
    userEvent.type(screen.getByTestId('transportation'), 'Car');

    userEvent.click(screen.getByRole('button', { name: /create journey/i }));

    await waitFor(() => {
        expect(handleSubmit).toReturn();

        ;
    });
  });

});
