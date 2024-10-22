import 'dart:async';
import 'package:flutter/material.dart';
import 'confirmation_page.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:mobile_scanner/mobile_scanner.dart';

class ScanPage extends StatefulWidget {
  final String classId;

  const ScanPage({super.key, required this.classId});

  @override
  ScanPageState createState() => ScanPageState();
}

class ScanPageState extends State<ScanPage> {
  MobileScannerController cameraController = MobileScannerController();
  BarcodeCapture? result;
  final _formKey = GlobalKey<FormState>();
  String? studentId;
  bool isScanning = true;

  Future<void> _fetchStudentDetails(String studentId) async {
    try {
      final response = await http.get(
        Uri.parse('http://192.168.8.100:5000/student/getStudentById/$studentId'),
      );

      if (response.statusCode == 200) {
        final studentData = json.decode(response.body);
        if (mounted) {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => ConfirmationPage(
                scannedData: studentData['_id'],
                classId: widget.classId,
                firstName: studentData['first_name'],
                lastName: studentData['last_name'],
                dateOfBirth: DateTime.parse(studentData['date_of_birth']),
                gender: studentData['gender'],
                grade: studentData['grade'],
                school: studentData['school'] ?? 'N/A',
                address: studentData['address'],
                guardianName: studentData['guardian_name'],
              ),
            ),
          );
        }
      } else {
        _showErrorSnackbar('Student not found or an error occurred');
      }
    } catch (e) {
      _showErrorSnackbar('Failed to fetch student details: $e');
    }
  }

  void _showErrorSnackbar(String message) {
    if (mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(message)),
      );
    }
  }


  void _toggleScanning() {
    setState(() {
      isScanning = !isScanning;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Scan QR Code')),
      body: Column(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Expanded(
            child: isScanning
                ? Container(
                    margin: const EdgeInsets.all(16.0),
                    child: MobileScanner(
                      controller: cameraController,
                      onDetect: (BarcodeCapture capture) {
                        final List<Barcode> barcodes = capture.barcodes;
                        final barcode = barcodes.isNotEmpty ? barcodes.first : null;
                        if (barcode?.rawValue != null) {
                          final String code = barcode!.rawValue!;
                          _fetchStudentDetails(code);
                          setState(() {
                            result = capture;
                          });
                        } else {
                          _showErrorSnackbar('Failed to scan QR code');
                        }
                      },
                    ),
                  )
                : Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 16.0),
                    child: Form(
                      key: _formKey,
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          const Text('Please enter Student ID:', textAlign: TextAlign.center),
                          const SizedBox(height: 20),
                          TextFormField(
                            decoration: const InputDecoration(
                              border: OutlineInputBorder(),
                              labelText: 'Student ID',
                            ),
                            validator: (value) {
                              if (value == null || value.isEmpty) {
                                return 'Please enter a student ID';
                              }
                              return null;
                            },
                            onSaved: (value) {
                              studentId = value;
                            },
                          ),
                          const SizedBox(height: 20),
                          ElevatedButton(
                            style: ElevatedButton.styleFrom(
                              backgroundColor: const Color.fromARGB(255, 3, 244, 87),
                              foregroundColor: Colors.white,
                              padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(12.0),
                              ),
                            ),
                            onPressed: () {
                              if (_formKey.currentState!.validate()) {
                                _formKey.currentState!.save();
                                _fetchStudentDetails(studentId!);
                              }
                            },
                            child: const Text('Submit'),
                          ),
                        ],
                      ),
                    ),
                  ),
          ),
          const SizedBox(height: 20),
          ElevatedButton(
            style: ElevatedButton.styleFrom(
              backgroundColor: Colors.lightBlue,
              foregroundColor: Colors.white,
              padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(12.0),
              ),
            ),
            onPressed: _toggleScanning,
            child: Text(isScanning ? 'Enter Student ID' : 'Scan QR Code'),
          ),
          const SizedBox(height: 20),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          cameraController.toggleTorch();
        },
        child: const Icon(Icons.flash_on),
      ),
    );
  }

  @override
  void dispose() {
    cameraController.dispose();
    super.dispose();
  }
}
