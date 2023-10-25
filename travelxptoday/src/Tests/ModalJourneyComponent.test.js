import {  render, screen, waitFor } from '@testing-library/react';
import ModalJourneyComponent from '../Components/ModalJourneyComponent';
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


  it('Returns an error when startdate has the wrong format', async () => {
    render(<ModalJourneyComponent refresh={() => { }} />);
  
    // Spy on window alert
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => { });
  
    userEvent.type(screen.getByTestId('name'), 'Art');
    userEvent.type(screen.getByTestId('startDate'), 'bob');
    userEvent.type(screen.getByTestId('endDate'), '2023-12-30');
    userEvent.type(screen.getByTestId('startLocation'), 'nuenen');
    userEvent.type(screen.getByTestId('destination'), 'eindhoven');
    userEvent.type(screen.getByTestId('description'), 'test');
    userEvent.type(screen.getByTestId('transportation'), 'Car');
    userEvent.type(screen.getByTestId('traveler-0'), 'art');
    userEvent.type(screen.getByTestId('traveler-1'), 'jelle');
  
    userEvent.click(screen.getByRole('button', { name: /create journey/i }));
    await waitFor(() => {
        expect(alertSpy).toHaveBeenCalledWith('Invalid date format');
    });
  
    // Clean up the spy
    alertSpy.mockRestore();
  });

  it('Returns an error when enddate has the wrong format', async () => {
    render(<ModalJourneyComponent refresh={() => { }} />);
  
    // Spy on window alert
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => { });
  
    userEvent.type(screen.getByTestId('name'), 'Art');
    userEvent.type(screen.getByTestId('startDate'), '2023-12-30');
    userEvent.type(screen.getByTestId('endDate'), 'bob');
    userEvent.type(screen.getByTestId('startLocation'), 'nuenen');
    userEvent.type(screen.getByTestId('destination'), 'eindhoven');
    userEvent.type(screen.getByTestId('description'), 'test');
    userEvent.type(screen.getByTestId('transportation'), 'Car');
    userEvent.type(screen.getByTestId('traveler-0'), 'art');
    userEvent.type(screen.getByTestId('traveler-1'), 'jelle');
  
    userEvent.click(screen.getByRole('button', { name: /create journey/i }));
    await waitFor(() => {
        expect(alertSpy).toHaveBeenCalledWith('Invalid date format');
    });
   
    // Clean up the spy
    alertSpy.mockRestore();
  });
  it('end date is before start date', async () => {

    render(<ModalJourneyComponent refresh={() => {}}  />);
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => { });

    userEvent.type(screen.getByTestId('name'), 'Art');
    userEvent.type(screen.getByTestId('startDate'), '2023-12-30');
    userEvent.type(screen.getByTestId('endDate'), '2023-12-25');
    userEvent.type(screen.getByTestId('startLocation'), 'New York');
    userEvent.type(screen.getByTestId('destination'), 'Los Angeles');
    userEvent.type(screen.getByTestId('description'), 'A memorable journey');
    userEvent.type(screen.getByTestId('transportation'), 'Car');
    userEvent.type(screen.getByTestId('traveler-0'), 'art');
    userEvent.type(screen.getByTestId('traveler-1'), 'jelle');

    userEvent.click(screen.getByRole('button', { name: /create journey/i }));
    
    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith('End date must be after start date');
    });

      // Clean up the spy
      alertSpy.mockRestore();
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

    it('Returns an error when name is empty', async () => {
        render(<ModalJourneyComponent refresh={() => { }} />);

        // Spy on window alert
        const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => { });

        userEvent.type(screen.getByTestId('name'), '');
        userEvent.type(screen.getByTestId('startDate'), '2023-12-25');
        userEvent.type(screen.getByTestId('endDate'), '2023-12-30');
        userEvent.type(screen.getByTestId('startLocation'), 'New York');
        userEvent.type(screen.getByTestId('destination'), 'Los Angeles');
        userEvent.type(screen.getByTestId('description'), 'A memorable journey');
        userEvent.type(screen.getByTestId('transportation'), 'Car');
        userEvent.type(screen.getByTestId('traveler-0'), 'art');
        userEvent.type(screen.getByTestId('traveler-1'), 'jelle');

        userEvent.click(screen.getByRole('button', { name: /create journey/i }));
        await waitFor(() => {
            expect(alertSpy).toHaveBeenCalledWith('The name must be a non-empty string');
        });
    
        // Clean up the spy
        alertSpy.mockRestore();
    });
    it('Returns an error when destination is empty', async () => {
      render(<ModalJourneyComponent refresh={() => { }} />);

      // Spy on window alert
      const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => { });

      userEvent.type(screen.getByTestId('name'), 'Art');
      userEvent.type(screen.getByTestId('startDate'), '2023-12-25');
      userEvent.type(screen.getByTestId('endDate'), '2023-12-30');
      userEvent.type(screen.getByTestId('startLocation'), 'New York');
      userEvent.type(screen.getByTestId('destination'), '');
      userEvent.type(screen.getByTestId('description'), 'A memorable journey');
      userEvent.type(screen.getByTestId('transportation'), 'Car');
      userEvent.type(screen.getByTestId('traveler-0'), 'art');
      userEvent.type(screen.getByTestId('traveler-1'), 'jelle');

      userEvent.click(screen.getByRole('button', { name: /create journey/i }));
      await waitFor(() => {
          expect(alertSpy).toHaveBeenCalledWith('Destination must be a non-empty string');
      });
  
      // Clean up the spy
      alertSpy.mockRestore();
  });
  it('Returns an error when startlocation is empty', async () => {
    render(<ModalJourneyComponent refresh={() => { }} />);

    // Spy on window alert
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => { });

    userEvent.type(screen.getByTestId('name'), 'Art');
    userEvent.type(screen.getByTestId('startDate'), '2023-12-25');
    userEvent.type(screen.getByTestId('endDate'), '2023-12-30');
    userEvent.type(screen.getByTestId('startLocation'), '');
    userEvent.type(screen.getByTestId('destination'), 'dsadsadsa');
    userEvent.type(screen.getByTestId('description'), 'A memorable journey');
    userEvent.type(screen.getByTestId('transportation'), 'Car');
    userEvent.type(screen.getByTestId('traveler-0'), 'art');
    userEvent.type(screen.getByTestId('traveler-1'), 'jelle');

    userEvent.click(screen.getByRole('button', { name: /create journey/i }));
    await waitFor(() => {
        expect(alertSpy).toHaveBeenCalledWith('Start location must be a non-empty string');
    });

    // Clean up the spy
    alertSpy.mockRestore();
});
it('Returns an error when description is empty', async () => {
  render(<ModalJourneyComponent refresh={() => { }} />);

  // Spy on window alert
  const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => { });

  userEvent.type(screen.getByTestId('name'), 'Art');
  userEvent.type(screen.getByTestId('startDate'), '2023-12-25');
  userEvent.type(screen.getByTestId('endDate'), '2023-12-30');
  userEvent.type(screen.getByTestId('startLocation'), 'nuenen');
  userEvent.type(screen.getByTestId('destination'), 'eindhoven');
  userEvent.type(screen.getByTestId('description'), '');
  userEvent.type(screen.getByTestId('transportation'), 'Car');
  userEvent.type(screen.getByTestId('traveler-0'), 'art');
  userEvent.type(screen.getByTestId('traveler-1'), 'jelle');

  userEvent.click(screen.getByRole('button', { name: /create journey/i }));
  await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith('Description must be a non-empty string');
  });

  // Clean up the spy
  alertSpy.mockRestore();
});

it('Returns an error when mode of transport is empty', async () => {
  render(<ModalJourneyComponent refresh={() => { }} />);

  // Spy on window alert
  const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => { });

  userEvent.type(screen.getByTestId('name'), 'Art');
  userEvent.type(screen.getByTestId('startDate'), '2023-12-25');
  userEvent.type(screen.getByTestId('endDate'), '2023-12-30');
  userEvent.type(screen.getByTestId('startLocation'), 'nuenen');
  userEvent.type(screen.getByTestId('destination'), 'eindhoven');
  userEvent.type(screen.getByTestId('description'), 'A memorable journey');
  userEvent.type(screen.getByTestId('transportation'), '');
  userEvent.type(screen.getByTestId('traveler-0'), 'art');
  userEvent.type(screen.getByTestId('traveler-1'), 'jelle');

  userEvent.click(screen.getByRole('button', { name: /create journey/i }));
  await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith('Transportation must be a non-empty string');
  });
 
  // Clean up the spy
  alertSpy.mockRestore();
});


    //TODO: Add traveler dropdown and test it 
});

// The only thing we is dont test is that it is posted to the database. but we dont want to do that because we dont want to post to the database when we are testing.