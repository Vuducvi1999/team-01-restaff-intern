namespace Common.Paganation
{
    public class SerachPaganationDTO<T>
    {

        public T Search { get; set; }
        public int PageIndex
        {
            get; set;
        }
        public int PageSize { get; set; } = 10;

    }
}
