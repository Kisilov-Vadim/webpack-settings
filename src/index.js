import Post from './Post'; 
import '@styles/styles.css';
import '@styles/styles.scss';
import * as $ from 'jquery'; 
import './babel';

const post = new Post('Webpack configuration'); 

$('pre').html(post.toString())