var ProductList = React.createClass({
    getInitialState:function(){
        return{
            data:[]
        };
    },
    componentDidMount(){
        var URL = 'https://sneakpeeq-sites.s3.amazonaws.com/interviews/ce/feeds/store.js';
        var outer = this;
        fetch(URL).then(function(response) {
            response.json().then(function(res){
                outer.setState({data:res.products});
            });
        });
    },
    render:function(){
        return(
            <div>
                <Product result={this.state.data}/>
            </div>
        );
    }
});

var Product = React.createClass({
    render:function(){
        var result = this.props.result.map(function(result,index){
            // Filter products for price less than $20 or 2000 cents
            if( result.defaultPriceInCents >= 2000){
                return <ProductItem key={index} product={ result } />
            }
        });
        return(
            <table>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Product Price</th>
                        <th>Product Image</th>
                    </tr>
                </thead>
                <tbody>
                        {result}
                </tbody>
            </table>
        );
    }
});
var ProductItem = React.createClass({
    render:function(){
        var product = this.props.product;
        var price = product.defaultPriceInCents/100;
        var style= { 
                     width: "200px", 
                     height: "200px"
                    }
        return(
            <tr>
                <td>{product.name}</td>
                <td>$ {price}</td>
                <td><img src={product.mainImage.ref} alt={product.name} style={style}></img></td>
            </tr>
        );
    }
});

ReactDOM.render(
    <ProductList/>,
    document.querySelector("#container")
);