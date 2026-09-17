import { Brand } from "@prisma/client";
import {
  CreateBrandParams,
  ListBrandResultT,
  ListBrandsParams,
  ListBrandT,
  UpdateBrandParams,
} from "../../types/brand";
import { SelectOptionT, ServiceResponseT } from "../../types/common";

export interface IBrandService {
  listPublicBrands(): Promise<ServiceResponseT<SelectOptionT[]>>;
  selectOptionListBrands(query: {
    limit?: number;
    cursor?: number | null;
    search?: string | undefined;
  }): Promise<
    ServiceResponseT<{
      items: SelectOptionT[];
      nextCursor: number | null;
    }>
  >;
}

export interface IAdminBrandService {
  listBrands(
    params: ListBrandsParams,
  ): Promise<ServiceResponseT<ListBrandResultT>>;
  getBrandDetail(slug: string): Promise<ServiceResponseT<ListBrandT>>;
  createBrand(params: CreateBrandParams): Promise<ServiceResponseT<Brand>>;
  updateBrand(
    slug: string,
    params: UpdateBrandParams,
  ): Promise<ServiceResponseT<Brand>>;
  deleteBrand(slug: string): Promise<ServiceResponseT<null>>;
}
