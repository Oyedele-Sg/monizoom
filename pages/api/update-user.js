import { firestore, auth } from 'libs/firebase-admin'

export default async function handler(req, res) {
  if (!req.headers.token) {
    res.status(401).json({ error: 'Not exist Token' });
  }

  try {
    const { uid } = await auth.verifyIdToken(req.headers.token);
    if (!uid) throw new Error({ message: "Not Authorized" })

    const user = req.body

    firestore
      .collection('users')
      .doc(user.uid)
      .set(user)
      .then(() => {
        // console.log('update user success', user)
        res.status(200).json({ data: user });
      })
  } catch (error) {
    console.log('update user error', error)
    res.status(401).json({ error: error.message });
  }
}