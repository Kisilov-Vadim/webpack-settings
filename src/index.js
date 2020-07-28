import Post from './Post'; 
import '@styles/styles.css';
import * as $ from 'jquery'; 

const post = new Post('Webpack configuration'); 

$('pre').html(post.toString())