import { Container } from '../components/layout/Container';
import { CalendarView } from '../components/progress/CalendarView';

function Calendar() {
  return (
    <Container className="pt-12 pb-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
        <p className="text-sm text-gray-600 mt-1">View your tasks and deadlines</p>
      </div>

      <CalendarView />
    </Container>
  );
}

export default Calendar;

