export interface TreeItem {
    id: string;
    label: string;
    children?: TreeItem[];
}

export const useTree = () => {
    const agruparPorDivision = (productos: any[], codigo_categoria: number) => {
        return productos
            .filter(p => p.codigo_categoria === codigo_categoria)
            .reduce((grupos: any, producto) => {
                const division = producto.codigo_division;
                if (!grupos[division]) {
                    grupos[division] = {
                        id: `div_${division}`,
                        label: producto.division,
                        children: []
                    };
                }
                grupos[division].children.push({
                    id: `prod_${producto.codigo}`,
                    label: producto.descripcion
                });
                return grupos;
            }, {});
    };

    const generateTree = (categorias: any[], productos: any[]) => {
        return categorias.map(categoria => {
            const categoriaNode: TreeItem = {
                id: `cat_${categoria.codigo}`,
                label: categoria.nombre,
                children: []
            };
            const divisionesConProductos = agruparPorDivision(productos, categoria.codigo);
            categoriaNode.children = Object.values(divisionesConProductos);
            return categoriaNode;
        });
    };

    return {
        generateTree
    };
};