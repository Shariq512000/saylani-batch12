### Install Routing 

npm i react-router

### Wrap App Component in index.js
    <BrowserRouter>
        <App />
    </BrowserRouter>

### use Routes and Route
    <Routes>
        <Route path="/login" element={<Login />}>
    </Routes>
### Change Url 
    <Link to="/login"> Login Page </Link>