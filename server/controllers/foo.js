const foo = async (req, res) => {
    console.log('foo was here');
    res.json({ message: 'Refreshed!' });
}

module.exports = { foo };