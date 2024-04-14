import promisePool from '../../utils/database.js';

const getAllUsers = async () => {
  const [rows] = await promisePool.query('SELECT * FROM users');
  return rows;
};

const getUserById = async (id) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM users WHERE user_id = ?',
    [id]
  );
  return rows.length === 0 ? false : rows[0];
};

const addUser = async (user) => {
  const {username, password} = user;
  const sql = `INSERT INTO users (username, password) VALUES (?, ?)`;
  const params = [username, password];
  const [rows] = await promisePool.execute(sql, params);
  return rows.affectedRows === 0 ? false : {user_id: rows.insertId};
};

const modifyUser = async (user, id) => {
  const sql = promisePool.format(`UPDATE users SET ? WHERE user_id = ?`, [
    user,
    id,
  ]);
  const [rows] = await promisePool.execute(sql);
  return rows.affectedRows === 0 ? false : {message: 'success'};
};

const removeUser = async (id) => {
  const connection = await promisePool.getConnection();

  try {
    await connection.beginTransaction();
    await connection.execute('DELETE FROM cats WHERE owner = ?', [id]);
    const sql = connection.format('DELETE FROM users WHERE user_id = ?', [id]);
    const [rows] = await connection.execute(sql);
    console.log('rows', rows);
    if (rows.affectedRows === 0) {
      return {message: 'User not found'};
    }
    await connection.commit();
    return {message: 'success'};
  } catch (e) {
    await connection.rollback();
    console.error('ROLLBACK', e.message);
    return false;
  } finally {
    connection.release();
  }
};

export {getAllUsers, getUserById, addUser, modifyUser, removeUser};
