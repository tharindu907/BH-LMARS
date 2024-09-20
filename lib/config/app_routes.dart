//import 'package:scan_app/data/model/user.dart';
import 'package:scan_app/pages/home_page.dart';
import 'package:scan_app/pages/login_page.dart';
import 'package:scan_app/pages/main_page.dart';
import 'package:scan_app/pages/user_page.dart';
import 'package:scan_app/provider/login_provider.dart';
import 'package:provider/provider.dart';

// lib/config/app_routes.dart
class AppRoutes {
  static final pages = {
    login: (context) => ChangeNotifierProvider(
          create: (context) => LoginProvider(),
          child: LoginPage(),
        ),
    home: (context) => HomePage(),
    main: (context) => MainPage(), // Ensure MainPage is properly defined
    user: (context) => UserPage(),
  };

  static const login = '/';
  static const home = '/home';
  static const main = '/main'; // Ensure this route matches your MainPage route
  static const editProfile = '/edit_profile';
  static const user = '/user';
}
