import {  render, screen, waitFor } from '@testing-library/react';
import ModalJourneyComponent from '../Components/ModalJourneyComponent';
import userEvent from '@testing-library/user-event';
beforeAll(() => {
    global.Element.prototype.animate = jest.fn();
  });

  async function fillForm({
    name = 'Test Journey',
    startDate = '2023-12-25',
    endDate = '2023-12-30',
    startLocation = 'New York',
    destination = 'Los Angeles',
    description = 'A memorable journey',
    transportation = 'Car',
    traveler0 = 'art',
    traveler1 = 'jelle',
  }){
    render(<ModalJourneyComponent refresh={() => {}} />);
    userEvent.type(screen.getByTestId('name'), name);
    userEvent.type(screen.getByTestId('startDate'), startDate);
    userEvent.type(screen.getByTestId('endDate'), endDate);
    userEvent.type(screen.getByTestId('startLocation'), startLocation);
    userEvent.type(screen.getByTestId('destination'), destination);
    userEvent.type(screen.getByTestId('description'), description);
    userEvent.type(screen.getByTestId('transportation'), transportation);
    userEvent.type(screen.getByTestId('traveler-0'), traveler0);
    userEvent.type(screen.getByTestId('traveler-1'), traveler1);
  }

  async function CheckError(expectedAlertMessage) {
    
    userEvent.click(screen.getByRole('button', { name: /create journey/i }));
  
    if (expectedAlertMessage) {
      const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
      await waitFor(() => {
        expect(alertSpy).toHaveBeenCalledWith(expectedAlertMessage);
      });
      alertSpy.mockRestore();
    }
  }
  

describe('ModalJourneyComponent', () => {
  it('Renders correctly', () => {
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
  
  it('Allows the user to fill in the form', async () => {
    fillForm({});
  

    expect(screen.getByTestId('name')).toHaveValue('Test Journey');
    expect(screen.getByTestId('startDate')).toHaveValue('2023-12-25');
    expect(screen.getByTestId('endDate')).toHaveValue('2023-12-30');
    expect(screen.getByTestId('startLocation')).toHaveValue('New York');
    expect(screen.getByTestId('destination')).toHaveValue('Los Angeles');
    expect(screen.getByTestId('description')).toHaveValue('A memorable journey');
    expect(screen.getByTestId('transportation')).toHaveValue('Car');
  });

  it('Returns an error when name is empty', async () => {
    fillForm({
      name: '',
    });
    CheckError('Name must be a non-empty string');
  });

  it('Returns an error when start date has the wrong format', async () => {
    fillForm({
      startDate: 'bob',
    });
    CheckError('Invalid date format');
  });
  
  it('Returns an error when end date has the wrong format', async () => {
    fillForm({
      endDate: 'bob',
    });
    CheckError('Invalid date format');
  });
  
  it('Returns an error when end date is before start date', async () => {
    fillForm({
      startDate: '2023-12-30',
      endDate: '2023-12-25',
    });
    CheckError('End date must be after start date');
  });
  
  it('Returns an error when start location is empty', async () => {
    fillForm({
      startLocation: '',
    });
    CheckError('Start location must be a non-empty string');
  });
  
  it('Returns an error when destination is empty', async () => {
    fillForm({
      destination: '',
    });
    CheckError('Destination must be a non-empty string');
  });
  
  it('Returns an error when description is empty', async () => {
    fillForm({
      description: '',
    });
    CheckError('Description must be a non-empty string');
  });
  
  it('Returns an error when mode of transport is empty', async () => {
    fillForm({
      transportation: '',
    });
    CheckError('Mode of transport must be a non-empty string');
  });


    //TODO: Add traveler dropdown and test it 
});
//TODO: make the user event less repetetive 
// The only thing we is dont test is that it is posted to the database. but we dont want to do that because we dont want to post to the database when we are testing.