import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('../components/dashboard/Dashboard'));
const Notification = lazy(() => import('../components/notification/Notification'));
const TaskList = lazy(() => import('../components/tasks/TaskList/TaskList'));
const CreateStory = lazy(() => import('../components/stories/CreateStory/CreateStory'));
const CreateTask = lazy(() => import('../components/tasks/createTask/CreateTask'));
const AddMemberInBoard = lazy(() => import('../components/boards/AddMemberInBoard/AddMemberInBoard'));
const SignedOutHomePage = lazy(() => import('../components/SignedOutHomePage/SignedOutHomePage'));
const CreateBoard = lazy(() => import('../components/boards/CreateBoard'));
const Navbar = lazy(() => import('../components/navbar/Navbar'));
const TaskDetails = lazy(() => import('../components/tasks/TaskDetails/TaskDetails'));
const ChatPanel = lazy(() => import('../components/chat-system/ChatPanel'));

const LazyCreateTask = (props) => (
  <Suspense fallback={<div>Loading...</div>}>
    <CreateTask {...props} />
  </Suspense>
);
const LazyCreateStory = (props) => (
  <Suspense fallback={<div>Loading...</div>}>
    <CreateStory {...props} />
  </Suspense>
);

const LazyAddMemberInBoard = (props) => (
  <Suspense fallback={<div>Loading...</div>}>
    <AddMemberInBoard {...props} />
  </Suspense>
);

const LazySignedOutHomePage = (props) => (
  <Suspense fallback={<div>Loading...</div>}>
    <SignedOutHomePage {...props} />
  </Suspense>
);

const LazyCreateBoard = (props) => (
  <Suspense fallback={<div>Loading...</div>}>
    <CreateBoard {...props} />
  </Suspense>
);

const LazyNavbar = (props) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Navbar {...props} />
  </Suspense>
);

const LazyDashboard = (props) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Dashboard {...props} />
  </Suspense>
);


const LazyNotification = (props) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Notification{...props} />
  </Suspense>
);
const LazyTaskList = (props) => (
  <Suspense fallback={<div>Loading...</div>}>
    <TaskList {...props} />
  </Suspense>
);
const LazyTaskDetails = (props) => (
  <Suspense fallback={<div>Loading...</div>}>
    <TaskDetails {...props} />
  </Suspense>
);

const LazyChatPanel = (props) => (
  <Suspense fallback={<div>Loading...</div>}>
    <ChatPanel {...props} />
  </Suspense>
);
export {
  LazyCreateStory as CreateStory,
  LazyCreateTask as CreateTask,
  LazyAddMemberInBoard as AddMemberInBoard,
  LazySignedOutHomePage as SignedOutHomePage,
  LazyCreateBoard as CreateBoard,
  LazyNavbar as Navbar,
  LazyDashboard as Dashboard,
  LazyNotification as Notification,
  LazyTaskList as TaskList,
  LazyTaskDetails as TaskDetails,
  LazyChatPanel as ChatPanel,
};
