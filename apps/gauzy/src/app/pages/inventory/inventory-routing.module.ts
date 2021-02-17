import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryComponent } from './components/inventory.component';
import { ProductTypesComponent } from './components/manage-product-types/product-types.component';
import { ProductCategoriesComponent } from './components/manage-product-categories/product-categories.component';
import { ProductFormComponent } from './components/edit-inventory-item/product-form.component';
import { TableInventoryComponent } from './components/table-inventory-items/table-inventory.component';
import { InventoryVariantFormComponent } from './components/edit-inventory-item-variant/variant-form.component';
import { PermissionsEnum } from '@gauzy/contracts';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { InventoryItemViewComponent } from './components/view-inventory-item/view-inventory-item.component';
import { WarehousesComponent } from './components/manage-warehouses/warehouses.component';
import { WarehouseFormComponent } from './components/manage-warehouses/warehouse-form/warehouse-form.component';
import { WarehousesTableComponent } from './components/manage-warehouses/warehouses-table/warehouses-table.component';

const ALL_ORG_PERMISSIONS = {
	permissions: {
		only: [
			PermissionsEnum.ALL_ORG_VIEW,
			PermissionsEnum.ALL_ORG_EDIT,
			PermissionsEnum.ORG_INVENTORY_VIEW
		],
		redirectTo: '/pages/dashboard'
	}
};

const routes: Routes = [
	{
		path: '',
		component: InventoryComponent,
		canActivate: [NgxPermissionsGuard],
		data: ALL_ORG_PERMISSIONS,
		children: [
			{
				path: '',
				redirectTo: 'all',
				pathMatch: 'full'
			},
			{
				path: 'all',
				component: TableInventoryComponent
			},
			{
				path: 'create',
				component: ProductFormComponent
			},
			{
				path: 'edit/:id',
				component: ProductFormComponent
			},
			{
				path: 'view/:id',
				component: InventoryItemViewComponent
			},
			{
				path: ':itemId/variants/:itemVariantId',
				component: InventoryVariantFormComponent
			}
		]
	},
	{
		path: 'product-types',
		component: ProductTypesComponent,
		canActivate: [NgxPermissionsGuard],
		data: ALL_ORG_PERMISSIONS
	},
	{
		path: 'product-categories',
		component: ProductCategoriesComponent,
		canActivate: [NgxPermissionsGuard],
		data: ALL_ORG_PERMISSIONS
	},
	{
		path: 'warehouses',
		component: WarehousesComponent,
		canActivate: [NgxPermissionsGuard],
		data: ALL_ORG_PERMISSIONS,
		children: [
			{
				path: 'all',
				component: WarehousesTableComponent
			},
			{
				path: 'create',
				component: WarehouseFormComponent
			},
			{
				path: 'edit/:id',
				component: WarehouseFormComponent
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class InventoryRoutingModule {}
