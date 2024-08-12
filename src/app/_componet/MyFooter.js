import React from 'react';


const Footer= () => {
  return (
    <footer className='footer'>
      <div className="row">
        <div className="col-12 text-center">
          <p>
            &copy; {new Date().getFullYear()}{" "}
            <a
              href="https://jaykyada.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className='highlight'
            >
              kyada jay.
            </a>
            All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
