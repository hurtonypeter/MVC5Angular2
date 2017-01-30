using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(MVC5Angular2.Startup))]
namespace MVC5Angular2
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
