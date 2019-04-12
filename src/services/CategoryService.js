import Request from './Request';



class CategoryService extends Request {
    constructor(){
        super('user-categories');
    }
    
    getUserCategories() {
        const options = {
            method: 'GET',
        };
        return this.send({ path:'/', options }).then( ({ json, status }) => json );
    }

    GetUserCategoriesStats() {
        const options = {
            method: 'GET',
        };
        return this.send({ path: '/stats', options }).then( ({ json }) => json );
    }
    
}

export default new CategoryService();