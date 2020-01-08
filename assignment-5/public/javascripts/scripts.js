function getProductDetail(productId) {
    if(productId) {
        const actionUrl = '/products/'+productId+'/ajax'
        $.ajax({
            url: actionUrl,
            success: function(res) {
                if(res.success) {
                    product = res.product
                    $('#productId').val(product.id)
                    $('#ptitle').val(product.title)
                    $('#pqty').val(product.qty)
                    $('#pdescr').val(product.descr)
                    $('#del_btn').attr('href', '/products/'+product.id+'/delete')
                } else {
                    alert('Not Found')
                }
            }
        })
    }
}

function confirm_delete()
{
    if(confirm('Are you sure want to delete?')) {
        return true
    } else {
        return false
    }
}