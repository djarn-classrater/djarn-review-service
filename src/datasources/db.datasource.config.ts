export default {
  name: 'db',
  connector: 'mysql',
  url: '',
  host: process.env.NODE_ENV === 'production' ? 'reviewDb' : '10.148.0.2',
  port: process.env.NODE_ENV === 'production' ? 3306 : 3306,
  user: 'root',
  password: '1234',
  database: 'reviews',
};
