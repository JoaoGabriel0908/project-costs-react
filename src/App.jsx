import { useState } from "react";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import Contact from "./components/pages/Contact";
import Company from "./components/pages/Company";
import NewProject from "./components/pages/NewProject";
import Container from "./components/layouts/Container";
import Navbar from './components/layouts/Navbar'
import Footer from './components/layouts/Footer'
import Projects from "./components/pages/Projects";
import ProjectSelected from "./components/pages/ProjectSelected";

function App() {
    return (
        <Router>
            <Navbar/>
            <Container customClass='min-height'>
                <Routes>
                    <Route exact path="/" element={<Home />}></Route>
                    <Route path="/projects" element={<Projects />}></Route>
                    <Route path="/company" element={<Company />}></Route>
                    <Route path="/contact" element={<Contact />}></Route>
                    <Route path="/newproject" element={<NewProject />}></Route>
                    <Route path="/project/:id" element={<ProjectSelected />}></Route>
                </Routes>
            </Container>
            <Footer/>
        </Router>
    );
}

export default App;
