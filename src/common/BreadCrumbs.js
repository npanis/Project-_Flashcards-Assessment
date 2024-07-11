
import React from "react";
import { Link } from "react-router-dom";
// Navigation

export const BreadCrumbs = ({ paths }) => (
  <nav aria-label="breadcrumb">
    <ol className="breadcrumb">
      <li className="breadcrumb-item">
        <Link to="/" className="btn btn-link"><i class="bi bi-house-door-fill"></i>Home</Link>
      </li>
    </ol>
  </nav>
);

export default BreadCrumbs;
