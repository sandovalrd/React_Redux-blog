import React from 'react';
import { connect } from 'react-redux';
// import { fetchPost } from '../actions';
import { fetchPostsandUsers } from '../actions';
import UserHeader from './UserHeader';


class PostList extends React.Component{

    componentDidMount(){
        // this.props.fetchPost();
        this.props.fetchPostsandUsers();
    }

    render(){
        return (
            <div className='ui relaxed divided list'>{this.renderList()}</div>
            );
    }

    renderList() {
        return this.props.posts.map( post => {
            return (
                <div className='item' key={post.id}>
                    <i className='large middle aligned icon user' />
                    <div className='content'>
                        <div className='description'>
                            <h2>{post.title}</h2>
                            <p>{post.body}</p>
                        </div>
                        <UserHeader userId={post.userId}/>
                    </div>
                </div>
            );
        });
    }
};


const mapStateToProps = state => {
    return {posts: state.posts};
} 


// export default connect(mapStateToProps, {fetchPost})(PostList);
export default connect(mapStateToProps, {fetchPostsandUsers})(PostList);