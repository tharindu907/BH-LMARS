import 'package:flutter/material.dart';
import 'package:scan_app/components/class_box.dart';
import 'package:scan_app/pages/scan_page.dart';
import 'package:scan_app/pages/student_list_page.dart'; // Import the StudentListPage

class HomePage extends StatelessWidget {
  HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: ListView(
          children: [
            ClassBox(
              grade: 'Grade 6',
              subject: 'Mathematics',
              teacher: 'Mr. Saman',
              time: '9:00 AM - 10:00 AM',
              onTap: () async {
                final classId = 'class1'; // Use class ID
                final scannedData = await Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => ScanPage(classId: classId),
                  ),
                );

                if (scannedData != null && scannedData is String) {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => StudentListPage(
                        classId: classId,
                        scannedData: scannedData as String, // Ensure type safety
                      ),
                    ),
                  );
                }
              },
            ),
            // Add more ClassBox widgets with appropriate class IDs
            // ...
          ],
        ),
      ),
    );
  }
}
