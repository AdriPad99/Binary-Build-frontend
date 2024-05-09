         <div className="navbar-left">
          <img src='images/logo2.png' alt='bodybuilder in binary' width='100' height='100'/>
          {/* If a token doesn't exist display the signin link
              If a token DOES exist display the signout link */}
          {/* {String(token).length <= 4 ? (
            <>
            
            </>
          ):(
            <>
            <a onClick={() => userLogout()} href="/signin">Sign-Out</a>
            </>
          )} */}
          {/* <a href="/signup">Sign-Up</a> */}
        </div>

        <div className='center'>            
          <a id='middle' href="/">Home</a>
          
          <a id='middle' href="/workouts">Workouts</a>
        </div>

        <div className="navbar-right">
          {/* if logged in show the profile button */}
          {String(token).length > 4 ? (
            <>
            <a onClick={() => userLogout()} href="/signin">Sign-Out</a>
              {/* <a href="/profile">Sign-Out</a> */}
              <a href="/profile">Profile</a>
              <a href="/signup">Try for Free</a>
            </>
          ) : (
            <>
            <a href="/signin">Sign-In</a>
            <a href="/signup">Try for Free</a>
            </>
          )}
        </div>