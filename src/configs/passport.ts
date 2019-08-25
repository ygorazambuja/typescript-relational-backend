import passport from 'passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import knexInstance from './db'

const authSecret = process.env.AUTH_SECRET

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: authSecret
}

const strategy = new Strategy(opts, (payload, done) => {
  knexInstance('pessoas')
    .where({ id: payload.id })
    .first()
    .then(user => done(null, user ? { ...payload } : false))
    .catch(err => done(err, false))
})

passport.use(strategy)

export default () => passport.authenticate('jwt', { session: false })
