# package used
- express - framework
- bcryptjs - to encrypt passwords
- passport - for authentication
- passport-local - strategy used with passport
- ejs - template engine used
- express-ejs-layouts - layout for ejs
- mongoose - to deal with mongodb
- connect-flash - for flash messaging
- express-session - connect-flash depends on this
- nodemon

# project tree

```
passport-auth-nodejs
├─ app.js
├─ config
│  ├─ auth.js
│  ├─ keys.js
│  └─ passport.js
├─ models
│  └─ User.js
├─ package-lock.json
├─ package.json
├─ public
│  └─ css
│     ├─ bootstrap.css
│     └─ bootstrap.min.css
├─ README.md
├─ routes
│  ├─ index.js
│  └─ users.js
└─ views
   ├─ dashboard.ejs
   ├─ layout.ejs
   ├─ login.ejs
   ├─ partials
   │  └─ messages.ejs
   ├─ register.ejs
   └─ welcome.ejs

```